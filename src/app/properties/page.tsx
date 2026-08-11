import MainLayout from "../components/layout/MainLayout";
import ContentReseve from "../components/templates/houseReserve/contentReseve/ContentReseve";

type Props = {
  searchParams: Promise<{
    destination?: string;
    checkIn?: string;
    checkOut?: string;
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
        <ContentReseve filters={filters} />
      </main>
    </MainLayout>
  );
}
