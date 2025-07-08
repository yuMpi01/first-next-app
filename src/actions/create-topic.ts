"use server";

import * as z from "zod/v4";
import { auth } from "@/auth";
import type { Topic } from "@prisma/client";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { paths } from "@/paths";
import { redirect } from "next/navigation";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .regex(/^[a-z]/)
    .transform((val) => val.replace(/[\s\W-]+/g, "-")),
  description: z.string().min(5, { message: "Description must be at least 5 characters" }),
});

interface createTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  formState: createTopicFormState,
  formData: FormData
): Promise<createTopicFormState> {
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  /* error if the name and description dont have enough characters */
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  /* error if user is not signed in */
  const session = await auth();

  if (!session || !session.user) {
    return {
      errors: {
        _form: ["you must sign in to create a topic"],
      },
    };
  }

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["something went wrong"],
        },
      };
    }
  }

  revalidatePath("/");
  redirect(paths.topicShowPath(topic.slug));
}
