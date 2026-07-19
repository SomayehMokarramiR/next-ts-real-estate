import Navbar from "../modules/navbar/Navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="relative z-[9999]">
        <Navbar />
      </div>

      <main>{children}</main>
    </>
  );
}
