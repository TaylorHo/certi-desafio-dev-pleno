import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PROFILE } from '@models/auth';

@Injectable({
  providedIn: 'root',
})
export class GlobalDataService {
  public currentUser$ = new BehaviorSubject<PROFILE | null>(null);
}
