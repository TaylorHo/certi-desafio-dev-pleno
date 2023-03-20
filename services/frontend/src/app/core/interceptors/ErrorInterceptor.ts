import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoadingSpinnerService } from '@core/services/common';

/**
 * Interceptor para tratar os erros recebidos, customizando as mensagens de erros.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private spinnerService: LoadingSpinnerService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = error.error || error.message;
        }
        this.spinnerService.removeQuene();
        return throwError({ status: error.status, message: errorMessage });
      }),
    );
  }
}
