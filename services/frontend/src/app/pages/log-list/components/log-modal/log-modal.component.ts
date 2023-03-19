import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LOG } from '@models/auth/logs.model';

@Component({
  selector: 'app-log-modal',
  templateUrl: './log-modal.component.html',
  styleUrls: ['./log-modal.component.scss'],
})
export class LogModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public log: LOG) {}
}
