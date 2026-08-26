import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
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
      <Header />
      <main>
        <Hero />
        <DesignedForEveryExperience />
        <About />
        <FeaturedCollection />
        <ArtOfCraftsmanship />
        <Testimonials />
        <FeaturedProjects />
        <WhyChooseUs />
        <OurProcess />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
