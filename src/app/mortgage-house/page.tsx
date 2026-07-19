import MainLayout from "../components/layout/MainLayout";
//
import MortgageHouse from "../components/templates/mortgageHouse/MortgageHouse";

function page() {
  return (
    <MainLayout>
      <main className="pt-20">
        <MortgageHouse />
      </main>
    </MainLayout>
  );
}

export default page;
