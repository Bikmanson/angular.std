import { Routes } from '@angular/router';
import { UsersComponent } from '../components/users/users.component';
import { UserComponent } from '../components/user/user.component';
import { TasksComponent } from '../components/tasks/tasks.component';
import { TaskFormComponent } from '../components/task-form/task-form.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin/dashboard',
  },
  {
    path: 'admin',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            component: UsersComponent,
          },
          {
            path: ':id',
            component: UserComponent,
          },
        ],
      },
      {
        path: 'tasks',
        children: [
          {
            path: '',
            component: TasksComponent,
          },
          {
            path: ':id',
            component: TaskFormComponent,
          },
        ],
      },
    ],
  },
];
