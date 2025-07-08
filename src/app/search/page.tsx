import { redirect } from "next/navigation";
import { fetchPostsBySearch } from "@/db/queries/posts";
import PostList from "@/components/posts/post-list";

interface searchProps {
  searchParams: Promise<{
    term: string;
  }>;
}

export default async function searchPage({ searchParams }: searchProps) {
  const { term } = await searchParams;

  if (!term) {
    redirect("/");
  }

  return (
    <div>
      <PostList fetchData={() => fetchPostsBySearch(term)} />
    </div>
  );
}
