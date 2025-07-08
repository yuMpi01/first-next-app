import TopicCreateForm from "@/components/topics/Topic-create-form";
import TopicList from "@/components/topics/topic-list";
import { fetchTopPosts } from "@/db/queries/posts";
import PostList from "@/components/posts/post-list";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Home() {
  return (
    <div className=" max-w-[850px] lg:w-[850px] md:w-[658px] flex justify-between p-4 mx-auto">
      <div>
        <h1 className="text-2xl font-bold bg-teal-300 text-black p-2 rounded-md w-fit mb-8">
          Top Posts
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
          <PostList fetchData={fetchTopPosts} />
        </Suspense>
      </div>

      <div className="border-2 border-gray-300 rounded-lg p-4 h-fit">
        <TopicCreateForm />
        <h2 className="text-[18px] font-bold mt-4">All Topics</h2>
        <TopicList />
      </div>
    </div>
  );
}
