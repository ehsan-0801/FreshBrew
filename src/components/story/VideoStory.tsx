"use client";

import { useDeviceProfile } from "@/hooks/useDeviceProfile";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ScrubStory } from "@/components/story/ScrubStory";
import { StackedStory } from "@/components/story/StackedStory";

/**
 * Picks how the café footage carries the story on this device. Scrubbing is
 * the full experience; everything else falls back to stacked sections so the
 * copy is never trapped behind an animation that cannot run.
 */
export function VideoStory() {
  const { pending, canPlayVideo, canScrub } = useDeviceProfile();
  const reduced = useReducedMotion();

  if (!pending && canScrub && !reduced) return <ScrubStory />;

  return <StackedStory playVideo={!pending && canPlayVideo && !reduced} />;
}
