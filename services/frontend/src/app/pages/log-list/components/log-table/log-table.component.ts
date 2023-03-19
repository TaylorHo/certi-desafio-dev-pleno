import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LOG } from '@models/auth/logs.model';

@Component({
  selector: 'log-table',
  templateUrl: './log-table.component.html',
  styleUrls: ['./log-table.component.scss'],
})
export class LogTableComponent {
  @Input() logList!: LOG[];
  @Output() viewLog = new EventEmitter<LOG>();
}
