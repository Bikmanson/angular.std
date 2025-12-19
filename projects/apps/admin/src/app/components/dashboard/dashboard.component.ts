import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { combineLatest } from 'rxjs';

import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';

import { GatewayService } from '@shared/services/gateway.service';
import { ITask } from '@shared/interfaces/task.interface';
import { IUser } from '../../interfaces/user.interface';
import { GET_TASKS, GET_USERS } from '@shared/constants/link.constant';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  gateway = inject(GatewayService);

  totalUsers = signal(0);
  totalTasks = signal(0);
  completedTasks = signal(0);
  inProgressTasks = signal(0);
  pendingTasks = signal(0);

  taskStatusData: any;
  taskPriorityData: any;
  chartOptions: any;

  ngOnInit(): void {
    this.loadDashboardData();
    this.initializeChartOptions();
  }

  loadDashboardData(): void {
    combineLatest([
      this.gateway.get<ITask[]>(GET_TASKS),
      this.gateway.get<IUser[]>(GET_USERS),
    ]).subscribe(([tasks, users]) => {
      this.totalUsers.set(users.length);
      this.totalTasks.set(tasks.length);
      this.completedTasks.set(tasks.filter(t => t.status === 'completed').length);
      this.inProgressTasks.set(tasks.filter(t => t.status === 'in-progress').length);
      this.pendingTasks.set(tasks.filter(t => t.status === 'pending').length);

      this.updateCharts(tasks);
    });
  }

  updateCharts(tasks: ITask[]): void {
    // Task Status Chart
    this.taskStatusData = {
      labels: ['Completed', 'In Progress', 'Pending'],
      datasets: [
        {
          data: [this.completedTasks(), this.inProgressTasks(), this.pendingTasks()],
          backgroundColor: ['#4CAF50', '#2196F3', '#FFC107'],
          hoverBackgroundColor: ['#45a049', '#1976D2', '#FFB300'],
        },
      ],
    };

    // Task Priority Chart
    const highPriority = tasks.filter(t => t.priority === 'high').length;
    const mediumPriority = tasks.filter(t => t.priority === 'medium').length;
    const lowPriority = tasks.filter(t => t.priority === 'low').length;

    this.taskPriorityData = {
      labels: ['High', 'Medium', 'Low'],
      datasets: [
        {
          data: [highPriority, mediumPriority, lowPriority],
          backgroundColor: ['#F44336', '#FF9800', '#03A9F4'],
          hoverBackgroundColor: ['#D32F2F', '#F57C00', '#0288D1'],
        },
      ],
    };
  }

  initializeChartOptions(): void {
    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: '#495057',
          },
        },
      },
    };
  }
}
