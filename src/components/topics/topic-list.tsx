import { db } from "@/db";
import { Button } from "../ui/button";
import Link from "next/link";
import { paths } from "@/paths";

export default async function TopicList() {
  const topics = await db.topic.findMany();

  const renderedTopics = topics.map((topic) => {
    return (
      <div key={topic.id}>
        <Link href={paths.topicShowPath(topic.slug)}>
          <Button className="cursor-pointer">{topic.slug}</Button>
        </Link>
      </div>
    );
  });

  return (
    <div className=" flex flex-row flex-wrap gap-1.5 mt-2.5 w-32 ">
      {renderedTopics}
    </div>
  );
}
