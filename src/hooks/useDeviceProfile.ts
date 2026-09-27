"use client";

import { useSyncExternalStore } from "react";

export interface DeviceProfile {
  /** Still measuring — render the poster rather than guessing. */
  pending: boolean;
  /** Safe to download and play the story video at all. */
  canPlayVideo: boolean;
  /** Safe to seek the video frame by frame as the page scrolls. */
  canScrub: boolean;
}

const SERVER_PROFILE: DeviceProfile = {
  pending: true,
  canPlayVideo: false,
  canScrub: false,
};

function detect(): DeviceProfile {
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory =
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;

  const saveData = connection?.saveData ?? false;

  // The story video is several megabytes. Browsers that report a slow
  // connection get the poster instead; an unknown connection is treated as
  // fast, since most desktop browsers do not report one at all.
  const slowLink = ["slow-2g", "2g", "3g"].includes(
    connection?.effectiveType ?? "",
  );

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.innerWidth < 768;

  // Data-saver, slow links and very weak devices never pull the video.
  const tooWeak = saveData || slowLink || cores <= 2 || memory <= 1;

  // Phones can play the video, but seeking it every frame is unreliable on
  // mobile Safari and expensive everywhere, so they get a looping backdrop.
  return {
    pending: false,
    canPlayVideo: !tooWeak,
    canScrub: !tooWeak && !coarse && !narrow,
  };
}

/** Measured once per page load; the answer cannot change without a reload. */
let cached: DeviceProfile | null = null;

const subscribe = () => () => {};
const getSnapshot = () => (cached ??= detect());
const getServerSnapshot = () => SERVER_PROFILE;

export function useDeviceProfile(): DeviceProfile {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
