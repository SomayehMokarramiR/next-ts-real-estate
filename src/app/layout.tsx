import "./globals.css";

import { Vazirmatn } from "next/font/google";
// import Navbar from "./components/modules/navbar/Navbar";
// import Footer from "./components/layout/footer/Footer";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
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
