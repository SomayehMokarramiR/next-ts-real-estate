import MainLayout from "../components/layout/MainLayout";
import SingleReserveHouse from "../components/templates/singleReserveHouse/SingleReserveHouse";

function page() {
  return (
    <MainLayout>
      <main className="pt-20">
        <SingleReserveHouse />
      </main>
    </MainLayout>
  );
}

export default page;
