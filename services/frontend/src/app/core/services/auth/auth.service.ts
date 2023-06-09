import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiService, GlobalDataService } from '../common';
import { SnackMessageService } from '../notifcation';
import { HTTP_REQ } from '@models/common';
import { LOGIN_FORM_DATA, PROFILE, REGISTER_FORM_DATA } from '@models/auth';

/**
 * Serviço responsável pela autenticação do usuário.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private apiService: ApiService,
    private snackMessage: SnackMessageService,
    private globalDataService: GlobalDataService,
  ) {}

  /**
   * Realiza o registro de um usuário
   */
  public async register(formData: REGISTER_FORM_DATA) {
    delete formData.passwordConfirm;
    const httpData: HTTP_REQ = {
      url: 'auth/register',
      body: {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      },
    };
    const { success, data } = await this.apiService.post(httpData);

    if (success && data?.access_token) {
      this.setCookies(data.access_token, data.id);

      this.router.navigate(['']);
    } else {
      this.snackMessage.show({
        message: 'Falha no registro',
      });
    }
  }

  /**
   * Realiza o login de um usuário
   */
  public async login(formData: LOGIN_FORM_DATA) {
    const httpData: HTTP_REQ = { url: 'auth/login', body: formData };
    const { success, data } = await this.apiService.post(httpData);
    if (success && data?.access_token) {
      this.setCookies(data.access_token, data.id);
      this.router.navigate(['']);
    } else {
      this.snackMessage.show({
        message: 'Falha no login',
      });
    }
  }

  /**
   * Retorna o perfil do usuário atual
   */
  public async userProfile(): Promise<PROFILE | null> {
    const userID = this.cookieService.get('userID');
    const httpData: HTTP_REQ = { url: `users/${userID}` };
    const { success, data } = await this.apiService.get(httpData);
    if (success && data?.existingUser) {
      const userInfo: PROFILE = {
        id: data.existingUser._id,
        name: data.existingUser.name,
        email: data.existingUser.email,
        role: data.existingUser.role,
      };
      this.globalDataService.currentUser$.next(userInfo);
      return userInfo;
    } else {
      this.snackMessage.show({
        message: 'Falha ao retornar o perfil',
      });
      this.logOut();
      return null;
    }
  }

  /**
   * Realiza logout da conta
   */
  public logOut() {
    this.cookieService.deleteAll();
    this.globalDataService.currentUser$.next(null);
    this.router.navigate(['/auth']);
  }

  /**
   * Salva o token JWT e o ID do usuário como cookies
   */
  private setCookies(oAuthToken: string, userID: string) {
    const expires = this.expireTime1Hour;
    this.cookieService.set('authToken', oAuthToken, {
      path: '/',
      expires,
    });
    this.cookieService.set('userID', userID, { path: '/', expires });
  }

  /**
   * Calcula a próxima 1hr, para expirar os cookies
   */
  private get expireTime1Hour() {
    const dNow = new Date();
    let dTime = dNow.getTime();
    dTime += 3600 * 1000;
    dNow.setTime(dTime);
    return dNow;
  }
}
