export interface ITask {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignedTo: number;
  createdAt: string;
  completedAt?: string;
  comments?: ITaskComment[];
  assignedUserName?: string;
}

export interface ITaskComment {
  id: number;
  taskId: number;
  userId: number;
  userName?: string;
  comment: string;
  createdAt: string;
}
