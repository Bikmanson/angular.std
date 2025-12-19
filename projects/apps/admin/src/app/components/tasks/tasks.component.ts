import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { combineLatest } from 'rxjs';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import { GatewayService } from '@shared/services/gateway.service';
import { TableComponent } from '@shared/components/table/table.component';
import { ITask } from '@shared/interfaces/task.interface';
import { IUser } from '../../interfaces/user.interface';
import { GET_TASKS, GET_USERS, TASKS_ENDPOINT } from '@shared/constants/link.constant';
import { ITableRowClick } from '@shared/interfaces/table-row-click.interface';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TableModule, TableComponent, RouterModule, ButtonModule, TagModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit {
  gateway: GatewayService = inject(GatewayService);
  router: Router = inject(Router);

  tasks: ITask[] = [];

  headers: Record<string, string> = {
    id: 'ID',
    title: 'Title',
    status: 'Status',
    priority: 'Priority',
    dueDate: 'Due Date',
    assignedUserName: 'Assigned To',
  };

  ngOnInit(): void {
    this.initTaskList();
  }

  initTaskList(): void {
    combineLatest<[ITask[], IUser[]]>([
      this.gateway.get<ITask[]>(GET_TASKS),
      this.gateway.get<IUser[]>(GET_USERS),
    ]).subscribe(([tasks, users]) => {
      for (const task of tasks) {
        const { assignedTo } = task;
        task.assignedUserName = users.find(({ id }) => id === assignedTo)?.name || 'Unassigned';
      }

      this.tasks = tasks;
    });
  }

  onRowClick({ item }: ITableRowClick<ITask>): void {
    this.router.navigate(['admin', 'tasks', item.id]);
  }

  deleteTask(taskId: number, event: Event): void {
    event.stopPropagation();
    if (confirm('Are you sure you want to delete this task?')) {
      this.gateway.delete(`${TASKS_ENDPOINT}/${taskId}`).subscribe(() => {
        this.initTaskList();
      });
    }
  }
}
