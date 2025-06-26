import {combineLatest, Observable, Subject} from 'rxjs';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {Select} from 'primeng/select';

import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {GatewayService} from '@shared/services/gateway.service';
import {GET_ROLES, GET_USERS} from '@shared/constants/link.constant';
import {AlertComponent} from '@shared/components/alert/alert.component';
import {AlertType} from '@shared/components/alert/types/alert.type';

import {IRole} from '../../interfaces/role.interface';
import {IUser} from '../../interfaces/user.interface';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    AlertComponent,
    Select,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  gateway = inject(GatewayService);
  route = inject(ActivatedRoute);
  router: Router = inject(Router)

  user$!: Observable<IUser>;
  roles$!: Observable<IRole[]>;

  usersEndpoint!: string;
  roles!: IRole[];

  form: FormGroup = new FormGroup<any>({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    roleId: new FormControl(3, Validators.required),
  });

  showAlert: Subject<void> = new Subject<void>();
  alertMessage: string = '';
  alertType: AlertType = 'info';

  ngOnInit() {
    this.initUsersEndpoint();
    this.initObservables();
    this.initForm();
  }

  onSave(): void {
    if (this.form.valid) {
      this.gateway.patch<IUser>(this.usersEndpoint, this.form.getRawValue())
        .subscribe(() => {
          this.alertType = 'success';
          this.alertMessage = 'The user data is updated';
          this.showAlert.next();
        });
    }
  }

  back() {
    this.router.navigate(['admin', 'users'])
  }

  private initUsersEndpoint() {
    const userId = this.route.snapshot.params['id'];
    this.usersEndpoint = `${GET_USERS}/${userId}`;
  }

  private initObservables() {
    this.user$ = this.gateway.get<IUser>(this.usersEndpoint);
    this.roles$ = this.gateway.get<IRole[]>(GET_ROLES);
  }

  private initForm() {
    combineLatest([this.user$, this.roles$]).subscribe(([user, roles]) => {
      this.roles = roles;
      this.form.patchValue(user);
    });
  }
}
