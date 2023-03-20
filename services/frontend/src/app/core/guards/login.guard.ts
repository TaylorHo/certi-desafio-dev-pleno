import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

/**
 * Page Guard para redirecionar usuários não autenticados para a página de login.
 */
@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private cookieService: CookieService, private router: Router) {}

  /**
   * Verifica se o usuário está autenticado.
   */
  get checkAuth() {
    const isLogged = this.cookieService.get('authToken') ? true : false;
    if (!isLogged) {
      return this.router.createUrlTree(['/auth']);
    }
    return isLogged;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuth;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuth;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[],
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuth;
  }
}
