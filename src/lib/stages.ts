export interface Stage {
  id: string;
  index: string;
  label: string;
  copy: string;
  /** Where this stage begins, as a fraction of the scroll story. */
  from: number;
  /** Where it ends. The next stage starts here. */
  to: number;
}

/**
 * The scroll story runs one linear pass through `website_video1.mp4`, so each
 * stage owns the slice of the video that actually shows it. Measured from the
 * footage: the bean holds to 0.11, beans fall to 0.24, the grinder runs to
 * 0.38, the basket fills to 0.58, extraction to 0.80, then the pour.
 */
export const HERO_END = 0.1;

export const STAGES: Stage[] = [
  {
    id: "origin",
    index: "01",
    label: "Origin",
    copy: "Carefully selected beans from distinctive growing regions.",
    from: 0.1,
    to: 0.25,
  },
  {
    id: "roast",
    index: "02",
    label: "Roast",
    copy: "Roasted with precision to bring out the character of every bean.",
    from: 0.25,
    to: 0.38,
  },
  {
    id: "grind",
    index: "03",
    label: "Grind",
    copy: "Ground fresh for every brew.",
    from: 0.38,
    to: 0.58,
  },
  {
    id: "brew",
    index: "04",
    label: "Brew",
    copy: "Time, temperature, and technique come together.",
    from: 0.58,
    to: 0.8,
  },
  {
    id: "cup",
    index: "05",
    label: "Cup",
    copy: "Finished with care. Served with intention.",
    from: 0.8,
    to: 1,
  },
];

export const STORY_VIDEO = {
  src: "/videos/website_video1.mp4",
  poster: "/images/hero/story-poster.webp",
  /** Intrinsic size, used to reserve space and avoid layout shift. */
  width: 970,
  height: 720,
} as const;
