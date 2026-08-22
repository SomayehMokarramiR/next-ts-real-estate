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
      <body>
        <main>
          <Providers>
            <MaintenanceGuard>{children}</MaintenanceGuard>
          </Providers>
        </main>
      </body>
    </html>
  );
}
