import Reveal from "@/components/ui/Reveal";
import Hero from "@/components/sections/Hero";
import DesignedForEveryExperience from "@/components/sections/DesignedForEveryExperience";
import About from "@/components/sections/About";
import FeaturedCollection from "@/components/sections/FeaturedCollection";
import ArtOfCraftsmanship from "@/components/sections/ArtOfCraftsmanship";
import Testimonials from "@/components/sections/Testimonials";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import OurProcess from "@/components/sections/OurProcess";

export default function Home() {
  return (
    <>
      <Hero />
      <Reveal>
        <DesignedForEveryExperience />
      </Reveal>
      <Reveal>
        <About />
      </Reveal>
      <Reveal>
        <FeaturedCollection />
      </Reveal>
      <Reveal>
        <ArtOfCraftsmanship />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal>
        <FeaturedProjects />
      </Reveal>
      <Reveal>
        <WhyChooseUs />
      </Reveal>
      <Reveal>
        <OurProcess />
      </Reveal>
    </>
  );
}
