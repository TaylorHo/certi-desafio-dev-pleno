import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACK_DATA } from '@models/notification';

/**
 * Serviço responsável por mostrar as notificações no SnackBar
 */
@Injectable({
  providedIn: 'root',
})
export class SnackMessageService {
  constructor(private snackbar: MatSnackBar) {}

  /**
   * Mostrar uma notificação no SnackBar
   */
  public show(snackData: SNACK_DATA) {
    this.snackbar.open(snackData?.message, snackData?.action || 'OK', {
      duration: snackData?.duration || 4000,
    });
  }
}
