import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { shareReplay } from 'rxjs';

/**
 * Serviço responsável por lidar com os endpoints da API de Logs.
 */
@Injectable({
  providedIn: 'root',
})
export class LogsService {
  private readonly logUrl = environment.logUrl;

  constructor(private http: HttpClient) {}

  /**
   * Retornar todos os logs salvos.
   */
  public async getAllLogs() {
    try {
      const result: any = await this.http.get(`${this.logUrl}/logs`).pipe(shareReplay()).toPromise();
      return { success: true, data: result, error: null };
    } catch (error: any) {
      return { success: false, data: null, error };
    }
  }

  /**
   * Retornar um único log pelo seu ID.
   */
  public async getSingleLog(logID: string) {
    try {
      const result: any = await this.http.get(`${this.logUrl}/logs/${logID}`).pipe(shareReplay()).toPromise();
      return { success: true, data: result, error: null };
    } catch (error: any) {
      return { success: false, data: null, error };
    }
  }
}
