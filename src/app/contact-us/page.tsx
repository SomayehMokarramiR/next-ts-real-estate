import MainLayout from "../components/layout/MainLayout";
import ContactUs from "../components/templates/contactUs/ContactUs";

function page() {
  return (
    <MainLayout>
      <main className="pt-20">
        <ContactUs />
      </main>
    </MainLayout>
  );
}

export default page;
