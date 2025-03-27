"use server";

import { revalidatePath } from "next/cache";

export async function updatePath(path: string) {
  revalidatePath(path);
}
