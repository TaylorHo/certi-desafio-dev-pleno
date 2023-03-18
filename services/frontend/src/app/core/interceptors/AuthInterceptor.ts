import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
// SERVICES
import { LoadingSpinnerService } from '@core/services/common';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService, private spinnerService: LoadingSpinnerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // ADD TOKEN TO REQUEST HEADER
    this.spinnerService.addQuene();
    const clonedRequest = this.cookieService.check('authToken')
      ? req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + this.cookieService.get('authToken')),
        })
      : req;
    return next.handle(clonedRequest).pipe(
      map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          this.spinnerService.removeQuene();
        }
        return evt;
      }),
    );
  }
}
