import { AppError } from "../errors/AppError";
import { createTask } from "../repositories/user.task.repository";
import { Task } from "../types/task";

// to validate title
function validateTitle(title: unknown): string {
  if (typeof title !== "string" || !title.trim()) {
    throw new AppError(400, "Title is required and must be a non-empty string");
  }
  const trimmedTitle = title.trim();
  if (trimmedTitle.length > 100) {
    throw new AppError(400, "Title must be 100 characters or less");
  }
  return trimmedTitle;
}

export async function createuserTask(
  userId: string,
  title: unknown,
): Promise<Task> {
  // validation of title
  const validTitle = validateTitle(title);
  return createTask(userId, validTitle);
}
