import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth';
import { PROFILE } from '@models/auth';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentUser!: Promise<PROFILE | null>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.userProfile();
    if (!this.currentUser) {
      this.logOut();
    }
  }

  /**
   * Realiza logout do usuário.
   */
  public logOut() {
    this.authService.logOut();
  }
}
