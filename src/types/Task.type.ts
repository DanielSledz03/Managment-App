export enum TaskStatus {
  InProgress = 'inprogress',
  Completed = 'completed',
  Rejected = 'rejected',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  priority: boolean;
  status: TaskStatus;
}
