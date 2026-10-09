import "./globals.css";

import Providers from "./providers";
import MaintenanceGuard from "./components/guards/MaintenanceGuard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="overflow-x-hidden">
        <main>
          <Providers>
            <MaintenanceGuard>{children}</MaintenanceGuard>
          </Providers>
        </main>
      </body>
    </html>
  );
}
