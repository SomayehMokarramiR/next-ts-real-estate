import MainLayout from "../components/layout/MainLayout";
import SingleBlog from "../components/templates/singleBlog/SingleBlog";

function page() {
  return (
    <MainLayout>
      <main className="pt-20">
        <SingleBlog />
      </main>
    </MainLayout>
  );
}

export default page;
