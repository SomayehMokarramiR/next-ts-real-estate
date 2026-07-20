import "./globals.css";

import { Vazirmatn } from "next/font/google";

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
        {/* <div className="relative z-[9999]">
          <Navbar />
        </div> */}
        {/* <main className="pt-20">{children}</main> */}
        <main>{children}</main>

        {/* <Footer /> */}
      </body>
    </html>
  );
}
