import { User } from './User.type';

export interface WorkSchedule {
  id: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  date: string;
  userId: number;
  user?: User;
}
