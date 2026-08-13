import MainLayout from "../../components/layout/MainLayout";
import PropertyDetails from "../../components/templates/propertyDetails/propertyDetails";

interface PropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;

  return (
    <MainLayout>
      <main className="pt-20 pb-16">
        <PropertyDetails propertyId={id} />
      </main>
    </MainLayout>
  );
}
