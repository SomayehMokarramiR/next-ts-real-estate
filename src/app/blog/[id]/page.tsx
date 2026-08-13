import MainLayout from "../../components/layout/MainLayout";
import SingleBlog from "../../components/templates/singleBlog/SingleBlog";

interface BlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = await params;

  return (
    <MainLayout>
      <main className="pt-20">
        <SingleBlog id={id} />
      </main>
    </MainLayout>
  );
}
