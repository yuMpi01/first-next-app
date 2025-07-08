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

export default function TopicCreateForm() {
  const [formState, action] = useActionState(actions.createTopic, {
    errors: {},
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className=" cursor-pointer ">
          Create a Topic
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Topic</DialogTitle>
          <DialogDescription>
            Create a topic here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action={action}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" placeholder="Javascript" />
              {formState.errors.name && (
                <Alert variant="destructive" className=" bg-red-100 ">
                  <AlertCircleIcon />
                  <AlertTitle>{formState.errors.name?.join(", ")}</AlertTitle>
                </Alert>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="describe your topic"
              />
              {formState.errors.description && (
                <Alert variant="destructive" className=" bg-red-100 ">
                  <AlertCircleIcon />
                  <AlertTitle>
                    {formState.errors.description?.join(", ")}
                  </AlertTitle>
                </Alert>
              )}

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
