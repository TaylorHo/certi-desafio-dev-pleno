import { Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { LoadingSpinner } from '@shared/components';

/**
 * Serviço responsável por mostrar Loading Spinner.
 */
@Injectable({
  providedIn: 'root',
})
export class LoadingSpinnerService {
  private overlayRef = this.cdkOverlayCreate();
  private spinnerCount = 0;

  constructor(private overlay: Overlay) {}

  private cdkOverlayCreate() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'overlay-backdrop',
      positionStrategy: this.overlay.position().global().bottom().right(),
    });
  }

  /**
   * Começa a rodar o spinner, tendo controle de uma fila de processamentos.
   */
  public addQuene() {
    if (this.spinnerCount > 0) {
      this.spinnerCount++;
    } else {
      this.showSpinner();
      this.spinnerCount = 1;
    }
  }

  /**
   * Começa a parar o spinner, levando em conta a fila de processamentos.
   */
  public removeQuene() {
    this.spinnerCount--;
    if (this.spinnerCount < 1) {
      this.stopSpinner();
    }
  }

  /**
   * Mostra o spinner
   */
  private showSpinner() {
    this.overlayRef.attach(new ComponentPortal(LoadingSpinner));
  }

  /**
   * Para o spinner
   */
  private stopSpinner() {
    this.overlayRef.detach();
  }
}
