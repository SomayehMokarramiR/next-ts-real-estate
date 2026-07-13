import NavbarWrapper from "./components/layout/NavbarWrapper";
import HeroSection from "./components/templates/landing/heroSection/HeroSection";
import OffersSection from "./components/templates/landing/offersSection/OffersSection";
import PropertySection from "./components/templates/landing/propertySection/PropertySection";
import VillaRentalSection from "./components/templates/landing/VillaRentalSection/VillaRentalSection";
export default function HomePage() {
  return (
    <>
      {/* <NavbarWrapper /> */}

      <main className="container mx-auto p-10">
        <HeroSection />
        <PropertySection />
        <OffersSection />
        <VillaRentalSection />
      </main>
    </>
  );
}
