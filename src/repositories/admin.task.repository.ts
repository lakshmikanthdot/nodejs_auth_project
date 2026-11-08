import { pool } from "../lib/db";
import { Task } from "../types/task";

type AdminTaskListQuery = {
  search?: string;
  status?: string;
};

type TaskRow = Task;

// http://localhost:4000/api/admin/tasks?search=second&status=RESOLVED

export async function findAlltasks(
  filters: AdminTaskListQuery,
): Promise<Task[]> {
  const conditions: string[] = [];
  const values: any[] = [];

  let paramIndex = 1;
  if (filters.search) {
    conditions.push(`title ILIKE $${paramIndex}`); // title ILIKE $1
    values.push(`%${filters.search}%`); // %second%
    // The % symbol in SQL is a wildcard (meaning "anything before" or "anything after").
    paramIndex++;
  }
  if (filters.status) {
    conditions.push(`status = $${paramIndex}`); // status = $2
    values.push(filters.status); // RESOLVED
    paramIndex++;
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  // `WHERE title ILIKE $1 AND status = $2`;
  const result = await pool.query<TaskRow>(
    `
    SELECT id, title, status, user_id, created_at, updated_at
    FROM support_tasks
    ${whereClause}
    ORDER BY created_at DESC
    `,
    values, // values will be [%second%, 'RESOLVED'] if both search and status are provided
  );
  return result.rows;
}
