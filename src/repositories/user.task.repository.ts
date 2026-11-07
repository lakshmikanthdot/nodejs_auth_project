import { pool } from "../lib/db";
import { Task } from "../types/task";

type TaskRow = Task;

export async function createTask(userId: string, title: string): Promise<Task> {
  const result = await pool.query<TaskRow>(
    `
    INSERT INTO support_tasks (title, user_id)
    VALUES ($1, $2)
    RETURNING id, title, status, user_id, created_at, updated_at 
    `,
    [title, userId],
  );
  return result.rows[0];
}

// get the tasks for the logged in user
export async function fetchTaskByUserId(userId: string): Promise<Task[]> {
  const result = await pool.query<TaskRow>(
    `
        SELECT * 
        FROM support_tasks
        WHERE user_id = $1
        ORDER BY created_at DESC
        `,
    [userId],
  );
  // we have multiple rows, so we return an array of tasks
  return result.rows;
}

// get single task by id for the logged in user|
export async function findTaskByTaskIdandUserId(
  userId: string,
  taskId: string,
): Promise<Task | null> {
  const result = await pool.query<TaskRow>(
    `
        SELECT *
        FROM support_tasks
        WHERE user_id = $1 AND id = $2
        `,
    [userId, taskId],
  );
  return result.rows[0] ?? null;
}

// update the task by id for the logged in user patch
export async function updateTaskTitle(
  taskId: string,
  userId: string,
  title: string,
): Promise<Task | null> {
  const result = await pool.query<TaskRow>(
    `
    UPDATE support_tasks
    SET title = $1, updated_at = NOW()
    WHERE id = $2 AND user_id = $3
    RETURNING *
    `,
    [title, taskId, userId],
  );
  return result.rows[0] ?? null;
}

// delete the task by id for the logged in user
export async function deleteTask(
  taskId: string,
  userId: string,
): Promise<boolean> {
  const result = await pool.query(
    `DELETE FROM support_tasks
    WHERE id = $1 AND user_id = $2
    `,
    [taskId, userId],
  );
  return (result.rowCount ?? 0) > 0;
}
