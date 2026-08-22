import ReservationDetailClient from "@/app/admin/components/templates/reservations/[id]/ReservationDetailClient";

interface ReservationDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ReservationDetailPage({
  params,
}: ReservationDetailPageProps) {
  const { id } = await params;

  return <ReservationDetailClient reservationId={id} />;
}
