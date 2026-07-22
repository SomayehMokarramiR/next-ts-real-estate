import MainLayout from "../components/layout/MainLayout";
import ReserveWizard from "../components/templates/singleReserveHouse/ReserveWizard";

export default function page() {
  return (
    <MainLayout>
      <main className="pt-20">
        <ReserveWizard />
      </main>
    </MainLayout>
  );
}
