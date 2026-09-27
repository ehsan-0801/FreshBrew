import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

interface GalleryImage {
  src: string;
  alt: string;
  /** Tailwind aspect class — the mix is what gives the grid its rhythm. */
  aspect: string;
}

/**
 * Two independent columns rather than one auto-placed grid. Each column
 * flows on its own, so differing image heights never leave a hole, and the
 * right column starts lower to keep the page from reading as a table.
 */
const COLUMN_A: GalleryImage[] = [
  {
    src: "/images/gallery/counter.webp",
    alt: "The espresso bar mid-service",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/gallery/beans.webp",
    alt: "Roasted beans resting after the roast",
    aspect: "aspect-square",
  },
  {
    src: "/images/gallery/pastry.webp",
    alt: "Croissants cooling on the pastry counter",
    aspect: "aspect-[3/4]",
  },
];

const COLUMN_B: GalleryImage[] = [
  {
    src: "/images/gallery/pour.webp",
    alt: "Milk poured into a fresh shot of espresso",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/images/gallery/interior.webp",
    alt: "Afternoon light across the seating area",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/gallery/brew.webp",
    alt: "A pour-over brewing at the filter bar",
    aspect: "aspect-square",
  },
];

function Frame({ image, delay }: { image: GalleryImage; delay: 0 | 1 }) {
  return (
    <Reveal
      variant="image"
      delay={delay}
      className={cn(
        "group relative overflow-hidden rounded-lg bg-beige",
        image.aspect,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        data-cursor="View"
        sizes="(min-width: 640px) 46vw, 92vw"
        className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
      />
    </Reveal>
  );
}

export function Gallery() {
  return (
    <section aria-labelledby="gallery-heading" className="shell py-24 sm:py-32">
      <h2 id="gallery-heading" className="sr-only">
        Inside the café
      </h2>

      <div className="grid gap-5 sm:grid-cols-2 lg:gap-8">
        <div className="flex flex-col gap-5 lg:gap-8">
          {COLUMN_A.map((image) => (
            <Frame key={image.src} image={image} delay={0} />
          ))}
        </div>

        <div className="flex flex-col gap-5 sm:mt-20 lg:gap-8">
          {COLUMN_B.map((image) => (
            <Frame key={image.src} image={image} delay={1} />
          ))}
        </div>
      </div>
    </section>
  );
}
