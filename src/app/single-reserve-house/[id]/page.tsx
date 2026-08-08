import ReserveWizard from "@/app/components/templates/singleReserveHouse/ReserveWizard";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <ReserveWizard propertyId={id} />;
}
