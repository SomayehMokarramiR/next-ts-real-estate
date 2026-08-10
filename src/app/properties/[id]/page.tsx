import PropertyDetails from "@/app/components/templates/propertyDetails/propertyDetails";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PropertyPage({ params }: Props) {
  const { id } = await params;

  return <PropertyDetails propertyId={id} />;
}
