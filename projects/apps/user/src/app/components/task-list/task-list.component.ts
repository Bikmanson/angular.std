import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { combineLatest } from 'rxjs';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';

import { GatewayService } from '@shared/services/gateway.service';
import { ITask } from '@shared/interfaces/task.interface';
import { IUser } from '../../interfaces/user.interface';
import { GET_TASKS, GET_USERS } from '@shared/constants/link.constant';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    TableModule,
    ButtonModule,
    Select,
    InputTextModule,
    TagModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  gateway = inject(GatewayService);
  router = inject(Router);

  // Signals for reactive state management
  tasks = signal<ITask[]>([]);
  users = signal<IUser[]>([]);
  selectedStatus = signal<string>('all');
  selectedPriority = signal<string>('all');
  searchTerm = signal<string>('');

  // Computed signal for filtered tasks
  filteredTasks = computed(() => {
    let filtered = this.tasks();

    // Filter by status
    if (this.selectedStatus() !== 'all') {
      filtered = filtered.filter(task => task.status === this.selectedStatus());
    }

    // Filter by priority
    if (this.selectedPriority() !== 'all') {
      filtered = filtered.filter(task => task.priority === this.selectedPriority());
    }

    // Filter by search term
    if (this.searchTerm()) {
      const search = this.searchTerm().toLowerCase();
      filtered = filtered.filter(
        task =>
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search)
      );
    }

    return filtered;
  });

  statusOptions = [
    { label: 'All Statuses', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Completed', value: 'completed' },
  ];

  priorityOptions = [
    { label: 'All Priorities', value: 'all' },
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ];

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    combineLatest([
      this.gateway.get<ITask[]>(GET_TASKS),
      this.gateway.get<IUser[]>(GET_USERS),
    ]).subscribe(([tasks, users]) => {
      // Attach user names to tasks
      const enrichedTasks = tasks.map(task => ({
        ...task,
        assignedUserName: users.find(u => u.id === task.assignedTo)?.name || 'Unassigned',
      }));

      this.tasks.set(enrichedTasks);
      this.users.set(users);
    });
  }

  onTaskClick(task: ITask): void {
    this.router.navigate(['/tasks', task.id]);
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

  isOverdue(task: ITask): boolean {
    if (task.status === 'completed') return false;
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    return dueDate < today;
  }
}
