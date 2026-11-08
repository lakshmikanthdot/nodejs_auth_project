// admin routes for task management
import { AppError } from "../errors/AppError";
import { findAlltasks } from "../repositories/admin.task.repository";
import { Task } from "../types/task";

// search query and filter query for admin tasks

// why opttional means
// some times user want to search or they dont want to search so we make it optional
type AdminTaskListQuery = {
  search?: string;
  status?: string;
};

type AdminTaskListResponse = {
  tasks: Task[];
};

const statusList = ["OPEN", "IN_PROGRESS", "RESOLVED"] as const;

type TaskStatus = (typeof statusList)[number];
// typeof statusList will return the type of statusList which is 'OPEN' | 'IN_PROGRESS' | 'RESOLVED'

// search query
// query parameter
// localhost:4000/admin/tasks?search=first (key is search and value is first)
// all thoose task where title starts with first
export async function getAdminTasks(
  query: AdminTaskListQuery,
): Promise<AdminTaskListResponse> {
  // when we receive the query means we have to remove the whitespaces
  // so we need to trim the query parameter
  const search = query.search?.trim() || undefined;
  const status = query.status?.trim() || undefined;

  // when we want to do filter with status where the status is  'OPEN','IN_PROGRESS', 'RESOLVED'
  // it was fixed status we can pass the failed status as query parameter
  // if the user pass the failed as status we have to throw the error because we dont have the failed status in our system
  if (status && !statusList.includes(status as TaskStatus)) {
    throw new AppError(
      400,
      "status must be between open, inprogress, resolved",
    );
  }

  const tasks = await findAlltasks({ search, status });
  return {
    tasks,
  };
}
