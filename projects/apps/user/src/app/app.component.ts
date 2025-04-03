import { Component } from '@angular/core';
import {UsersComponent} from './components/users/users.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [UsersComponent]
})
export class AppComponent {
  title = 'user';
}
