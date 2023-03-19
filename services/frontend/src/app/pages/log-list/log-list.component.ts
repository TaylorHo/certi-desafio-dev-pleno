import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogsService } from '@core/services/logs/logs.service';
import { SnackMessageService } from '@core/services/notifcation';
import { LOG } from '@models/auth/logs.model';
import { LogModal } from './components';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss'],
})
export class LogListComponent implements OnInit {
  public logList: LOG[] = [];

  constructor(
    private logService: LogsService,
    private dialog: MatDialog,
    private messageService: SnackMessageService,
  ) {}

  async ngOnInit() {
    const { success, data } = await this.logService.getAllLogs();
    if (success && data?.logData) {
      this.logList = data?.logData;
    } else {
      this.messageService.show({
        message: 'Nenhum log encontrado',
      });
      this.logList = [];
    }
  }

  public viewLog(log: any) {
    this.dialog.open(LogModal, {
      width: '450px',
      maxWidth: '100%',
      data: log,
      disableClose: true,
    });
  }
}
