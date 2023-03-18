import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACK_DATA } from '@models/notification';

@Injectable({
  providedIn: 'root',
})
export class SnackMessageService {
  constructor(private snackbar: MatSnackBar) {}

  public show(snackData: SNACK_DATA) {
    this.snackbar.open(snackData?.message, snackData?.action || 'OK', {
      duration: snackData?.duration || 4000,
    });
  }
}
