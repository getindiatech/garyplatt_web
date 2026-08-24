import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import PremiumServices from "@/components/PremiumServices/PremiumServices";
import About from "@/components/About/About";
import FeaturedCollection from "@/components/FeaturedCollection/FeaturedCollection";
import Philosophy from "@/components/Philosophy/Philosophy";
import Testimonials from "@/components/Testimonials/Testimonials";
import FeaturedInstallation from "@/components/FeaturedInstallation/FeaturedInstallation";
import WhyChooseUs from "@/components/WhyChooseUs/WhyChooseUs";
import TradeShows from "@/components/TradeShows/TradeShows";
import OurProcess from "@/components/OurProcess/OurProcess";
import Footer from "@/components/Footer/Footer";
import BackToTop from "@/components/BackToTop/BackToTop";

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
