"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_END, STAGES, STORY_VIDEO } from "@/lib/stages";
import { HeroCopy, StageCopy } from "@/components/story/StoryOverlay";

gsap.registerPlugin(ScrollTrigger);

/**
 * Total scroll length of the pinned story, in viewport heights. 340 leaves
 * each of the six beats — the hero plus five stages — roughly 350px of
 * scroll: long enough to read, short enough that the footage keeps moving.
 */
const STORY_VH = 340;

/**
 * One linear pass through the café video, scrubbed by scroll. The hero copy
 * holds over the opening bean, then each stage's copy fades through as the
 * footage reaches the step it describes.
 *
 * Pinning is CSS `position: sticky` rather than ScrollTrigger's `pin`. Sticky
 * never rewrites the document flow, so it cannot fight Lenis over scroll
 * height; GSAP is left to do what only it can — drive the timeline.
 */
export function ScrubStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);


  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    // Seeking is asynchronous. Rather than assigning `currentTime` on every
    // scroll event — which queues seeks faster than the decoder retires them —
    // the timeline writes to a proxy and one ticker applies the latest value
    // whenever the decoder is idle.
    const proxy = { time: 0 };

    const applySeek = () => {
      const duration = video.duration;
      if (!duration || Number.isNaN(duration)) return;
      if (video.seeking) return;
      if (Math.abs(video.currentTime - proxy.time) < 1 / 30) return;
      video.currentTime = proxy.time;
    };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          // Just enough lag to smooth discrete wheel steps into a continuous
          // scrub, without the footage lagging behind the hand.
          scrub: 0.35,
          invalidateOnRefresh: true,
        },
      });

      // The whole timeline is exactly 1 long, so positions below read as
      // story progress: 0.38 on the timeline is 38% of the way through.
      tl.to(
        proxy,
        {
          // Stop a frame short; seeking to the very end can stall the decoder.
          time: () => Math.max(0, (video.duration || 0) - 0.05),
          duration: 1,
          onUpdate: applySeek,
        },
        0,
      );

      // Hero copy holds over the opening bean, then lifts away.
      tl.to(
        heroRef.current,
        { autoAlpha: 0, y: -48, duration: HERO_END * 0.45 },
        HERO_END * 0.55,
      );

      STAGES.forEach((stage, i) => {
        const el = stageRefs.current[i];
        const span = stage.to - stage.from;
        const fade = Math.min(0.045, span * 0.3);

        if (el) {
          // Each stage finishes arriving exactly as its slice begins, and
          // starts leaving one fade before the slice ends — so consecutive
          // captions cross over rather than leaving a blank gap between them.
          tl.fromTo(
            el,
            { autoAlpha: 0, y: 36 },
            { autoAlpha: 1, y: 0, duration: fade },
            Math.max(0, stage.from - fade),
          );
          // The last stage stays up through the final frame.
          if (i < STAGES.length - 1) {
            tl.to(
              el,
              { autoAlpha: 0, y: -28, duration: fade },
              stage.to - fade,
            );
          }
        }
      });
    }, section);

    gsap.ticker.add(applySeek);

    // Metadata may land after the timeline is built; refresh so the
    // function-based duration resolves.
    const onLoaded = () => ScrollTrigger.refresh();
    video.addEventListener("loadedmetadata", onLoaded);

    return () => {
      video.removeEventListener("loadedmetadata", onLoaded);
      gsap.ticker.remove(applySeek);
      ctx.revert();
    };
  }, []);

  const showVideo = true;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="story-heading"
      data-dark-media
      className="relative bg-coffee text-cream"
      style={{ height: `${STORY_VH}vh` }}
    >
      <h2 id="story-heading" className="sr-only">
        From bean to cup
      </h2>

      {/* Always in the HTML, so the story is readable without the video. */}
      <ol className="sr-only">
        {STAGES.map((stage) => (
          <li key={stage.id}>
            {stage.index} {stage.label}. {stage.copy}
          </li>
        ))}
      </ol>

      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* ---- Footage ---- */}
        <div aria-hidden="true" className="absolute inset-0">
          <Image
            src={STORY_VIDEO.poster}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {showVideo && (
            <video
              ref={videoRef}
              src={STORY_VIDEO.src}
              poster={STORY_VIDEO.poster}
              width={STORY_VIDEO.width}
              height={STORY_VIDEO.height}
              muted
              playsInline
              preload="auto"
              tabIndex={-1}
              disablePictureInPicture
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-coffee/35" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-coffee via-coffee/75 to-transparent" />
        </div>

        {/* ---- Copy ---- */}
        <div className="shell relative z-10 flex flex-1 flex-col justify-end pb-16 pt-[var(--header-h)] sm:pb-20 lg:pb-24">
          <div className="relative min-h-[22rem] max-w-2xl sm:min-h-[20rem]">
            <div ref={heroRef} className="absolute inset-x-0 bottom-0">
              <HeroCopy />
            </div>

            {STAGES.map((stage, i) => (
              <div
                key={stage.id}
                ref={(el) => {
                  stageRefs.current[i] = el;
                }}
                aria-hidden="true"
                className="invisible absolute inset-x-0 bottom-0 opacity-0"
              >
                <StageCopy stage={stage} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
