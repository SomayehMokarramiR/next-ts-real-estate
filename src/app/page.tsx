import NavbarWrapper from "./components/layout/NavbarWrapper";
import HeroSection from "./components/templates/landing/heroSection/HeroSection";
import OffersSection from "./components/templates/landing/offersSection/OffersSection";
import PropertySection from "./components/templates/landing/propertySection/PropertySection";
import VillaRentalSection from "./components/templates/landing/VillaRentalSection/VillaRentalSection";
import CredibilitySection from "./components/templates/landing/credibilitySection/CredibilitySection";
import BestSection from "./components/templates/landing/bestSection/BestSection";
import OurSelectSection from "./components/templates/landing/ourSelectSection/OurSelectSection";
import Footer from "./components/layout/footer/Footer";
export default function HomePage() {
  return (
    <>
      {/* <NavbarWrapper /> */}

      <main className="container mx-auto">
        <HeroSection />
        <PropertySection />
        <OffersSection />
        <VillaRentalSection />
        <CredibilitySection />
        <BestSection />
        <OurSelectSection />
        <Footer />
      </main>
    </>
  );
}
