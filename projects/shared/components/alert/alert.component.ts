import {Component, Input, OnInit} from '@angular/core';
import {Message} from 'primeng/message';
import {Subject} from 'rxjs';
import {AlertType} from '@shared/components/alert/types/alert.type';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [Message],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent implements OnInit {
  @Input() show$!: Subject<void>;
  @Input() message!: string;
  @Input() time: number = 3000;
  @Input() type: AlertType = 'info';

  show: boolean = false;

  ngOnInit() {
    this.show$.subscribe(() => {
      this.show = true;

      setTimeout(() => {
        this.show = false;
      }, this.time + 1000);
    })
  }
}
