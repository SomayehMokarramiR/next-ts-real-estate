import ReserveLayout from "@/app/components/layout/ReserveLayout";
import { ReserveProgressProvider } from "@/app/context/ReserveProgressContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ReserveProgressProvider>
      <ReserveLayout>{children}</ReserveLayout>
    </ReserveProgressProvider>
  );
}
