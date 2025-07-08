"use client";

import { Input } from "./ui/input";
import { useSearchParams } from "next/navigation";
import * as action from "@/actions/search";

export default function SearchInput() {
  const searchParams = useSearchParams();

  return (
    <form action={action.search}>
      <Input
        type="search"
        name="term"
        placeholder="Search"
        className=" md:w-96 w-3xs "
        defaultValue={searchParams.get("term") || ""}
      />
    </form>
  );
}
