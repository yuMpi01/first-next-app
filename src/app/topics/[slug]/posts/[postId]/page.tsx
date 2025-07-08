import Link from "next/link";
import PostShow from "@/components/posts/post-show";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import { paths } from "@/paths";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface PostShowPageProps {
  params: Promise<{
    slug: string;
    postId: string;
  }>;
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = await params;

  return (
    <div className="space-y-3 mt-4 max-w-[850px] lg:w-[850px] md:w-[658px] ">
      <Link
        className="underline decoration-solid text-teal-500 hover:text-teal-700 "
        href={paths.topicShowPath(slug)}
      >
        {"< "}Back to {slug}
      </Link>
      <Suspense
        fallback={
          <div className="space-y-2 mt-5">
            <Skeleton className="h-5 w-[350px]" />
            <div className="p-4 border rounded">
              <Skeleton className="h-5 w-[300px]" />
            </div>
          </div>
        }
      >
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <Suspense
        fallback={
          <div className="space-y-2 mt-5">
            <Skeleton className="h-5 w-[350px]" />
            <div className="p-4 border rounded space-y-2">
              <Skeleton className="h-5 w-[300px]" />
              <Skeleton className="h-5 w-[300px]" />
              <Skeleton className="h-5 w-[300px]" />
            </div>
          </div>
        }
      >
        <CommentList postId={postId} />
      </Suspense>
    </div>
  );
}
