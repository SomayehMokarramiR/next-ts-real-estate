import MainLayout from "../components/layout/MainLayout";
import SingleFastReserve from "../components/templates/singleFastReserve/SingleFastReserve";

function page() {
  return (
    <MainLayout>
      <main className="pt-20">
        <SingleFastReserve />
      </main>
    </MainLayout>
  );
}

export default page;
