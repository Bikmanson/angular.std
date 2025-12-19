import { TableModule } from 'primeng/table';
import { Component, inject, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';
import { GatewayService } from '@shared/services/gateway.service';
import { TableComponent } from '@shared/components/table/table.component';
import { combineLatest } from 'rxjs';
import { IRole } from '../../interfaces/role.interface';
import { GET_ROLES, GET_USERS } from '@shared/constants/link.constant';
import { ITableRowClick } from '@shared/interfaces/table-row-click.interface';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, TableModule, TableComponent, RouterModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  gateway: GatewayService = inject(GatewayService);
  router: Router = inject(Router);

  users: IUser[] = [];

  headers: Record<string, string> = {
    id: 'ID',
    name: 'User name',
    email: 'Email',
    roleName: 'Role',
  };

  ngOnInit(): void {
    this.initUserList();
  }

  initUserList(): void {
    combineLatest<[IUser[], IRole[]]>([
      this.gateway.get<IUser[]>(GET_USERS),
      this.gateway.get<IRole[]>(GET_ROLES),
    ]).subscribe(([users, roles]) => {
      for (const user of users) {
        const { roleId } = user;

        user.roleName = roles.find(({ id }) => id === roleId)?.name;
      }

      this.users = users;
    });
  }

  onRowClick({ item }: ITableRowClick<IUser>): void {
    this.router.navigate(['admin', 'users', item.id]);
  }
}
