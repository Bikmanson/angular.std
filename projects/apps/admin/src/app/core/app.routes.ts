import {Routes} from '@angular/router';
import {UsersComponent} from '../components/users/users.component';
import {UserComponent} from '../components/user/user.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'admin/users'
  },
  {
    path: 'admin',
    children: [
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
    ],
  },
];
