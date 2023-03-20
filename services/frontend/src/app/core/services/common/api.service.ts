import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { HTTP_REQ, HTTP_RES } from '@models/common';

/**
 * Serviço responsável por gerenciar as chamadas à API.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  /**
   * Requisições do tipo GET
   */
  public async get(httpData: HTTP_REQ): Promise<HTTP_RES> {
    try {
      const httpOptions = this.generateHttpOptions(httpData.params, httpData.headers);
      const result: any = await this.http
        .get(`${this.apiUrl}/${httpData.url}`, httpOptions)
        .pipe(shareReplay())
        .toPromise();
      return { success: true, data: result, error: null };
    } catch (error: any) {
      return { success: false, data: null, error };
    }
  }

  /**
   * Requisições do tipo POST
   */
  public async post(httpData: HTTP_REQ) {
    try {
      const httpOptions = this.generateHttpOptions(httpData.params, httpData.headers);
      const result: any = await this.http
        .post(`${this.apiUrl}/${httpData.url}`, httpData.body, httpOptions)
        .pipe(shareReplay())
        .toPromise();
      return { success: true, data: result, error: null };
    } catch (error: any) {
      return { success: false, data: null, error };
    }
  }

  /**
   * Requisições do tipo PUT
   */
  public async put(httpData: HTTP_REQ) {
    try {
      const httpOptions = this.generateHttpOptions(httpData.params, httpData.headers);
      const result: any = await this.http
        .put(`${this.apiUrl}/${httpData.url}`, httpData.body, httpOptions)
        .pipe(shareReplay())
        .toPromise();
      return { success: true, data: result, error: null };
    } catch (error: any) {
      return { success: false, data: null, error };
    }
  }

  /**
   * Requisições do tipo DELETE
   */
  public async delete(httpData: HTTP_REQ) {
    try {
      const result: any = await this.http
        .delete(`${this.apiUrl}/${httpData.url}`, httpData.body)
        .pipe(shareReplay())
        .toPromise();
      return { success: true, data: result, error: null };
    } catch (error: any) {
      return { success: false, data: null, error };
    }
  }

  /**
   * Gera opções dinâmicas para a requisição HTTP
   */
  private generateHttpOptions(params: any, headers: any) {
    const httpOptions: any = {};
    if (params) {
      let httpParams = new HttpParams();
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          const paramValue = params[key];
          httpParams = httpParams.append(key, paramValue);
        }
      }
      httpOptions.params = httpParams;
    }
    if (headers) {
      let httpHeaders = new HttpHeaders();
      for (const key in headers) {
        if (Object.prototype.hasOwnProperty.call(headers, key)) {
          const headerValue = headers[key];
          httpHeaders = httpHeaders.append(key, headerValue);
        }
      }
      httpOptions.headers = httpHeaders;
    }
    return httpOptions;
  }
}
