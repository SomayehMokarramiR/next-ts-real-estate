import MainLayout from "@/app/components/layout/MainLayout";
import PropertyDetails from "@/app/components/templates/propertyDetails/propertyDetails";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PropertyPage({ params }: Props) {
  const { id } = await params;

  return (
    <MainLayout>
      <main className="pt-20 pb-16">
        <PropertyDetails propertyId={id} />
      </main>
    </MainLayout>
  );
}
