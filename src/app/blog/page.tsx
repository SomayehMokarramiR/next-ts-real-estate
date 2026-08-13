import MainLayout from "../components/layout/MainLayout";
import CategoryBlog from "../components/templates/categoryBlog/CategoryBlog";

function page() {
  return (
    <MainLayout>
      <main className="pt-20">
        <div className="py-6 sm:py-8">
          <CategoryBlog />
        </div>
      </main>
    </MainLayout>
  );
}

export default page;
