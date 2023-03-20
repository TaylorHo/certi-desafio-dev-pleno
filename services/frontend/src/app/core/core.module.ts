import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingSpinner } from '@shared/components';
import { httpInterceptorProviders } from './interceptors';

@NgModule({
  declarations: [LoadingSpinner],
  imports: [CommonModule, HttpClientModule, MatSnackBarModule, OverlayModule, MatProgressSpinnerModule],
  providers: [CookieService, httpInterceptorProviders],
})
export class CoreModule {}
