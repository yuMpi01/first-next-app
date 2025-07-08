import type { Post } from "@prisma/client";
import { db } from "..";

export type PostWithData = Post & {
  user: { name: string | null };
  topic: { slug: string };
  _count: { comments: number };
};

export function fetchPostsBySearch(term: string): Promise<PostWithData[]> {
  return db.post.findMany({
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },
    where: {
      OR: [{ title: { contains: term } }, { content: { contains: term } }],
    },
  });
}

export function fetchPostByTopicSlug(slug: string): Promise<PostWithData[]> {
  return db.post.findMany({
    where: { topic: { slug } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
}

export function fetchTopPosts(): Promise<PostWithData[]> {
  return db.post.findMany({
    orderBy: {
      comments: {
        _count: "desc",
      },
    },
    include: {
      user: { select: { name: true, image: true } },
      topic: { select: { slug: true } },
      _count: { select: { comments: true } },
    },
    take: 4,
  });
}
