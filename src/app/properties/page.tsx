import MainLayout from "../components/layout/MainLayout";
import Breadcrumb from "../components/modules/breadcrumb/Breadcrumb";
import Properties from "../components/templates/properties/Properties";

type Props = {
  searchParams: Promise<{
    destination?: string;
    guests?: string;
    type?: string;
  }>;
};

export default async function PropertiesPage({ searchParams }: Props) {
  const params = await searchParams;

  const filters = {
    city: params.destination || "",
    guests: params.guests || "",
    type: params.type || "",
  };

  return (
    <MainLayout>
      <main className="pt-30 pb-16">
        <div className="mb-6">
          <Breadcrumb />
        </div>

        <Properties filters={filters} />
      </main>
    </MainLayout>
  );
}
