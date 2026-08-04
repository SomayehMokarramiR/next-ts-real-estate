import "./globals.css";

import { Vazirmatn } from "next/font/google";
import Providers from "./providers";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={vazirmatn.className}>
        <main>
          {" "}
          <Providers>{children} </Providers>
        </main>
      </body>
    </html>
  );
}
