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
  };

  return <ContentReseve filters={filters} />;
}
