import EditReservationClient from "@/app/admin/components/templates/reservations/[id]/edit/EditReservationClient";

interface EditReservationPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditReservationPage({
  params,
}: EditReservationPageProps) {
  const { id } = await params;

  return <EditReservationClient reservationId={id} />;
}
