import PropertyDetailClient from "../../../components/templates/properties/[id]/PropertyDetailClient";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyDetailPage({ params }: Props) {
  const { id } = await params;

  return <PropertyDetailClient propertyId={id} />;
}
