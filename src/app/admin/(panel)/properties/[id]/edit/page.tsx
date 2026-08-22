import EditPropertyClient from "../../../../components/templates/properties/[id]/edit/EditPropertyClient";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditPropertyClient propertyId={id} />;
}
