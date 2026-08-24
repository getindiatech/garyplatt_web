import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/layout/BackToTop";
import Hero from "@/components/sections/Hero";
import PremiumServices from "@/components/sections/PremiumServices";
import About from "@/components/sections/About";
import FeaturedCollection from "@/components/sections/FeaturedCollection";
import Philosophy from "@/components/sections/Philosophy";
import Testimonials from "@/components/sections/Testimonials";
import FeaturedInstallation from "@/components/sections/FeaturedInstallation";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TradeShows from "@/components/sections/TradeShows";
import OurProcess from "@/components/sections/OurProcess";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PremiumServices />
        <About />
        <FeaturedCollection />
        <Philosophy />
        <Testimonials />
        <FeaturedInstallation />
        <WhyChooseUs />
        <TradeShows />
        <OurProcess />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
