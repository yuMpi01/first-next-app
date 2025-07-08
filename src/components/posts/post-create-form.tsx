"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import * as actions from "@/actions";
import { useActionState } from "react";
import FormButton from "../common/form-button";

interface createPostFormProps{
  slug:string
}

export default function PostCreateForm({slug}:createPostFormProps) {

    const [formState,action]=useActionState(actions.createPost.bind(null,slug),{errors:{}})

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className=" cursor-pointer">
          Create a Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Post</DialogTitle>
          <DialogDescription>
            Create a Post here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action={action}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" />
              {formState.errors.title && <Alert variant="destructive" className=" bg-red-100 ">
                  <AlertCircleIcon />
                  <AlertTitle>{formState.errors.title?.join(", ")}</AlertTitle>
                </Alert>}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="content">content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="describe your content"
              />
              {formState.errors.content && <Alert variant="destructive" className=" bg-red-100 ">
                  <AlertCircleIcon />
                  <AlertTitle>{formState.errors.content?.join(", ")}</AlertTitle>
                </Alert>}

                {formState.errors._form && (
                <Alert variant="destructive">
                  <AlertCircleIcon />
                  <AlertTitle>{formState.errors._form?.join(", ")}</AlertTitle>
                </Alert>
              )}
            </div>
          </div>
          <DialogFooter>
            <FormButton>save</FormButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
