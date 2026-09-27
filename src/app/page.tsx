import { VideoStory } from "@/components/story/VideoStory";
import { BrandIntro } from "@/components/coffee/BrandIntro";
import { SignatureCoffee } from "@/components/coffee/SignatureCoffee";
import { MenuPreview } from "@/components/menu/MenuPreview";
import { CafeExperience } from "@/components/gallery/CafeExperience";
import { Gallery } from "@/components/gallery/Gallery";
import { Philosophy } from "@/components/coffee/Philosophy";
import { Location } from "@/components/location/Location";

export default function HomePage() {
  return (
    <>
      {/* Hero and the bean-to-cup story are one scroll-scrubbed sequence. */}
      <VideoStory />
      <BrandIntro />
      <SignatureCoffee />
      <MenuPreview />
      <CafeExperience />
      <Gallery />
      <Philosophy />
      <Location />
    </>
  );
}
