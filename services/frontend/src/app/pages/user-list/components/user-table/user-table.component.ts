import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GlobalDataService } from '@core/services/common';
import { PROFILE } from '@models/auth';
import { environment } from '@environments/environment';

@Component({
  selector: 'user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent {
  private readonly userRoles = environment?.userRoles;
  @Input() userList!: PROFILE[];
  @Output() update = new EventEmitter<PROFILE>();
  @Output() delete = new EventEmitter<PROFILE>();

  constructor(private globalData: GlobalDataService) {}

  visualizeUserRole(roleIndex: number | undefined): string {
    return this.userRoles[roleIndex ? roleIndex : 0];
  }

  isOwner(user: PROFILE): boolean {
    return this.globalData.currentUser$.getValue()?.id === user?.id;
  }

  canEdit(user: PROFILE): boolean {
    const isTheSameUser: boolean = this.isOwner(user);
    const currentUserRole: number = this.globalData.currentUser$.getValue()?.role ?? 1;

    if (isTheSameUser) return true;
    if (currentUserRole === 3) return true;

    const userHaveHigherRole: boolean = currentUserRole > user?.role;
    return userHaveHigherRole;
  }

  trackByFn(index: number, user: PROFILE): number {
    return user?.id;
  }
}
