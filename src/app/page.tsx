import Reveal from "@/components/ui/Reveal";
import Hero from "@/components/sections/Hero";
import DesignedForEveryExperience from "@/components/sections/DesignedForEveryExperience";
import About from "@/components/sections/About";
import FeaturedCollection from "@/components/sections/FeaturedCollection";
import ArtOfCraftsmanship from "@/components/sections/ArtOfCraftsmanship";
import Testimonials, { type TestimonialSlide } from "@/components/sections/Testimonials";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import OurProcess from "@/components/sections/OurProcess";
import { TESTIMONIALS } from "@/content/home";
import { getTestimonials, imageUrl } from "@/lib/api";

export const revalidate = 300;

export default async function Home() {
  const published = await getTestimonials();

  // Quotes come with their own punctuation on the site; the slide adds none.
  const slides: TestimonialSlide[] =
    published.length > 0
      ? published.slice(0, 6).map((item) => ({
          quote: /^["“]/.test(item.quote) ? item.quote : `"${item.quote}"`,
          name: item.author,
          role: [item.role, item.company ?? item.venue].filter(Boolean).join(", ") || "Gary Platt customer",
          avatar: imageUrl(item.avatar, "/images/avatar-victoria.jpg"),
        }))
      : TESTIMONIALS;

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
        <Testimonials items={slides} />
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
