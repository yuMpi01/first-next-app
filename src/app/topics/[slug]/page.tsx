import PostCreateForm from "@/components/posts/post-create-form";
import { fetchPostByTopicSlug } from "@/db/queries/posts";
import PostList from "@/components/posts/post-list";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface topicShowPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function topicShowPage({ params }: topicShowPageProps) {
  const { slug } = await params;

  return (
    <div className=" max-w-[850px] lg:w-[850px] md:w-[658px] flex justify-between p-4 mx-auto">
      <div>
        <h1 className=" mb-5 text-2xl font-bold w-fit bg-teal-300 text-black p-2 rounded-md ">
          {slug}
        </h1>

        <Suspense
          fallback={
            <div className="space-y-2 mt-5">
              <Skeleton className="h-5 w-[350px] mb-5" />
              <Skeleton className="h-5 w-[300px]" />
              <Skeleton className="h-5 w-[300px]" />
              <Skeleton className="h-5 w-[300px]" />
            </div>
          }
        >
          <PostList fetchData={() => fetchPostByTopicSlug(slug)} />
        </Suspense>
      </div>
      <div className="border-2 border-gray-300 rounded-lg p-4 h-fit">
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}
