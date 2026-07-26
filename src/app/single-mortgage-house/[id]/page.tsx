import MainLayout from "../../components/layout/MainLayout";
import SingleMotrgageHouse from "../../components/templates/singleMortgageHouse/SingleMortgageHouse";

function page() {
  return (
    <MainLayout>
      <main className="pt-20">
        <SingleMotrgageHouse />
      </main>
    </MainLayout>
  );
}

export default page;
