import NavbarWrapper from "./components/layout/NavbarWrapper";
import HeroSection from "./components/templates/landing/heroSection/HeroSection";
import OffersSection from "./components/templates/landing/offersSection/OffersSection";
import PropertySection from "./components/templates/landing/propertySection/PropertySection";
export default function HomePage() {
  return (
    <>
      {/* <NavbarWrapper /> */}

      <main className="container mx-auto p-10">
        <HeroSection />
        <PropertySection />
        <OffersSection />
      </main>
    </>
  );
}
