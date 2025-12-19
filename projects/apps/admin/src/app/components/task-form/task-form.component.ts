import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Textarea } from 'primeng/textarea';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { CardModule } from 'primeng/card';

import { GatewayService } from '@shared/services/gateway.service';
import { ITask } from '@shared/interfaces/task.interface';
import { IUser } from '../../interfaces/user.interface';
import { GET_TASKS, GET_USERS, TASKS_ENDPOINT } from '@shared/constants/link.constant';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { AlertType } from '@shared/components/alert/types/alert.type';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    Textarea,
    Select,
    DatePicker,
    CardModule,
    AlertComponent,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {
  gateway = inject(GatewayService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  users: IUser[] = [];
  taskId: number | null = null;
  isEditMode = false;
  alertType: AlertType = 'success';
  alertMessage = '';
  showAlert = false;

  form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    status: new FormControl('pending', Validators.required),
    priority: new FormControl('medium', Validators.required),
    dueDate: new FormControl('', Validators.required),
    assignedTo: new FormControl(null, Validators.required),
  });

  statusOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Completed', value: 'completed' },
  ];

  priorityOptions = [
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
  ];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id && id !== 'new') {
      this.isEditMode = true;
      this.taskId = +id;
      this.loadTask(this.taskId);
    } else {
      this.loadUsers();
    }
  }

  loadTask(taskId: number): void {
    combineLatest([
      this.gateway.get<ITask>(`${GET_TASKS}/${taskId}`),
      this.gateway.get<IUser[]>(GET_USERS),
    ]).subscribe(([task, users]) => {
      this.users = users;
      this.form.patchValue({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        dueDate: new Date(task.dueDate),
        assignedTo: task.assignedTo,
      });
    });
  }

  loadUsers(): void {
    this.gateway.get<IUser[]>(GET_USERS).subscribe(users => {
      this.users = users;
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.showAlertMessage('error', 'Please fill all required fields');
      return;
    }

    const formValue = this.form.value;
    const taskData: Partial<ITask> = {
      title: formValue.title,
      description: formValue.description,
      status: formValue.status,
      priority: formValue.priority,
      dueDate: this.formatDate(formValue.dueDate),
      assignedTo: formValue.assignedTo,
    };

    if (this.isEditMode && this.taskId) {
      this.gateway.patch<ITask>(`${TASKS_ENDPOINT}/${this.taskId}`, taskData).subscribe({
        next: () => {
          this.showAlertMessage('success', 'Task updated successfully');
          setTimeout(() => this.router.navigate(['admin', 'tasks']), 1500);
        },
        error: () => {
          this.showAlertMessage('error', 'Failed to update task');
        },
      });
    } else {
      const newTask = {
        ...taskData,
        createdAt: new Date().toISOString(),
        comments: [],
      };

      this.gateway.post(TASKS_ENDPOINT, newTask).subscribe({
        next: () => {
          this.showAlertMessage('success', 'Task created successfully');
          setTimeout(() => this.router.navigate(['admin', 'tasks']), 1500);
        },
        error: () => {
          this.showAlertMessage('error', 'Failed to create task');
        },
      });
    }
  }

  formatDate(date: Date): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  showAlertMessage(type: AlertType, message: string): void {
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;
  }

  goBack(): void {
    this.router.navigate(['admin', 'tasks']);
  }
}
