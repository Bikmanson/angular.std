import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { Textarea } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { GatewayService } from '@shared/services/gateway.service';
import { ITask, ITaskComment } from '@shared/interfaces/task.interface';
import { IUser } from '../../interfaces/user.interface';
import { GET_TASKS, GET_USERS } from '@shared/constants/link.constant';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ButtonModule,
    CardModule,
    TagModule,
    DividerModule,
    Textarea,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
})
export class TaskDetailComponent implements OnInit {
  gateway = inject(GatewayService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  messageService = inject(MessageService);

  task = signal<ITask | null>(null);
  user = signal<IUser | null>(null);
  newComment = signal<string>('');
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (taskId) {
      this.loadTask(+taskId);
    }
  }

  loadTask(taskId: number): void {
    this.isLoading.set(true);
    this.gateway.get<ITask>(`${GET_TASKS}/${taskId}`).subscribe({
      next: task => {
        this.task.set(task);
        this.loadUser(task.assignedTo);
        this.isLoading.set(false);
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load task',
        });
        this.isLoading.set(false);
      },
    });
  }

  loadUser(userId: number): void {
    this.gateway.get<IUser>(`${GET_USERS}/${userId}`).subscribe({
      next: user => {
        this.user.set(user);
      },
    });
  }

  markAsCompleted(): void {
    const currentTask = this.task();
    if (!currentTask) return;

    const updatedTask: Partial<ITask> = {
      status: 'completed',
      completedAt: new Date().toISOString(),
    };

    this.gateway.patch<ITask>(`${GET_TASKS}/${currentTask.id}`, updatedTask).subscribe({
      next: task => {
        this.task.set(task);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Task marked as completed',
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update task',
        });
      },
    });
  }

  addComment(): void {
    const currentTask = this.task();
    const commentText = this.newComment();

    if (!currentTask || !commentText.trim()) return;

    const comment: ITaskComment = {
      id: (currentTask.comments?.length || 0) + 1,
      taskId: currentTask.id,
      userId: currentTask.assignedTo,
      userName: this.user()?.name || 'User',
      comment: commentText,
      createdAt: new Date().toISOString(),
    };

    const updatedComments = [...(currentTask.comments || []), comment];
    const updatedTask: Partial<ITask> = {
      comments: updatedComments,
    };

    this.gateway.patch<ITask>(`${GET_TASKS}/${currentTask.id}`, updatedTask).subscribe({
      next: task => {
        this.task.set(task);
        this.newComment.set('');
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Comment added successfully',
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to add comment',
        });
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/tasks']);
  }

  getStatusSeverity(status: string): string {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'info';
      case 'pending':
        return 'warning';
      default:
        return 'secondary';
    }
  }

  getPrioritySeverity(priority: string): string {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'medium':
        return 'warn';
      case 'low':
        return 'info';
      default:
        return 'secondary';
    }
  }

  isOverdue(): boolean {
    const currentTask = this.task();
    if (!currentTask || currentTask.status === 'completed') return false;
    const dueDate = new Date(currentTask.dueDate);
    const today = new Date();
    return dueDate < today;
  }
}
