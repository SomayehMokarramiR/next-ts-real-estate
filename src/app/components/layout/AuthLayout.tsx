import Navbar from "./navbar/Navbar";

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

      <main className="bg-background  text-text-body">{children}</main>
    </>
  );
}
