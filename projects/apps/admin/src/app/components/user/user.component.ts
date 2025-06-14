import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IUser} from '../../interfaces/user.interface';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';

import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    FormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  http: HttpClient = inject(HttpClient);

  public user?: IUser;

  constructor(private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const { id } = this.route.snapshot.params;

    if (id) {
      this.http.get<IUser>(`http://localhost:3000/users/${id}`)
        .subscribe(user => {
          this.user = user;
        });
    }
  }

  onSave(): void {
    console.log('save');
  }
}
