"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

interface formButtonProps {
  children: React.ReactNode;
}

export default function FormButton({ children }: formButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="mt-2.5 mx-auto cursor-pointer">
      {pending ? "saving..." : children}
    </Button>
  );
}
