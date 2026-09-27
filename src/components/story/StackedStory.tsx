"use client";

import Image from "next/image";
import { STAGES, STORY_VIDEO } from "@/lib/stages";
import { Reveal } from "@/components/ui/Reveal";
import { HeroCopy, StageCopy } from "@/components/story/StoryOverlay";

/**
 * The story without scrubbing, for phones and for anyone who asked for
 * reduced motion. The footage stays as a calm backdrop — looping or a still —
 * while the five stages scroll past it as ordinary sections.
 */
export function StackedStory({ playVideo }: { playVideo: boolean }) {
  return (
    <section
      aria-labelledby="story-heading-stacked"
      data-dark-media
      className="relative bg-coffee text-cream"
    >
      <h2 id="story-heading-stacked" className="sr-only">
        From bean to cup
      </h2>

      {/* Backdrop sticks without adding scroll height of its own. */}
      <div
        aria-hidden="true"
        className="sticky top-0 -mb-[100svh] h-[100svh] overflow-hidden"
      >
        <Image
          src={STORY_VIDEO.poster}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {playVideo && (
          <video
            src={STORY_VIDEO.src}
            poster={STORY_VIDEO.poster}
            width={STORY_VIDEO.width}
            height={STORY_VIDEO.height}
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
            tabIndex={-1}
            disablePictureInPicture
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-coffee/45" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-coffee via-coffee/70 to-transparent" />
      </div>

      <div className="relative z-10">
        <div className="shell flex min-h-[100svh] flex-col justify-end pb-16 pt-[var(--header-h)]">
          <div className="max-w-2xl">
            <HeroCopy />
          </div>
        </div>

        {STAGES.map((stage) => (
          <div
            key={stage.id}
            className="shell flex min-h-[72svh] items-center border-t border-cream/10"
          >
            <Reveal>
              <StageCopy stage={stage} />
            </Reveal>
          </div>
        ))}
      </div>
    </section>
  );
}
