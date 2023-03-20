import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PROFILE } from '@models/auth';

/**
 * Serviço responsável por guardar localmente os dados do usuário atual.
 */
@Injectable({
  providedIn: 'root',
})
export class GlobalDataService {
  /**
   * Usuário atual.
   */
  public currentUser$ = new BehaviorSubject<PROFILE | null>(null);
}
