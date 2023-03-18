import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalDataService } from '@core/services/common';
import { AuthService } from '@core/services/auth';
import { PROFILE } from '@models/auth';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public readonly userRoles: string[] = environment.userRoles;
  public currentUser$: Observable<PROFILE | null> = this.globalData.currentUser$.asObservable();

  constructor(private globalData: GlobalDataService, private authService: AuthService) {}

  public logOut() {
    this.authService.logOut();
  }
}
