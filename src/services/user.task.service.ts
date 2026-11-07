import { AppError } from "../errors/AppError";
import {
  createTask,
  fetchTaskByUserId,
  findTaskByTaskIdandUserId,
  updateTaskTitle,
} from "../repositories/user.task.repository";
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

// get the tasks for the logged in user
export async function getUserTasks(userId: string): Promise<Task[]> {
  return fetchTaskByUserId(userId);
}

// single task by id for the logged in user
export async function getUserTaskById(
  userId: string,
  taskId: string,
): Promise<Task> {
  const task = await findTaskByTaskIdandUserId(userId, taskId);
  if (!task) {
    throw new AppError(404, "Task not found");
  }
  return task;
}

// patch the task by id for the logged in user
export async function updateUserTask(
  taskId: string,
  userId: string,
  title: string,
): Promise<Task> {
  const validTitle = validateTitle(title);
  const task = await updateTaskTitle(taskId, userId, validTitle);
  if (!task) {
    throw new AppError(404, "Task not found");
  }
  return task;
}
