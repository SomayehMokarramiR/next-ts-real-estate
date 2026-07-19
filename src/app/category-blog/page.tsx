import MainLayout from "../components/layout/MainLayout";
import CategoryBlog from "../components/templates/categoryBlog/CategoryBlog";

function page() {
  return (
    <MainLayout>
      <main className="pt-20">
        <CategoryBlog />
      </main>
    </MainLayout>
  );
}

export default page;
