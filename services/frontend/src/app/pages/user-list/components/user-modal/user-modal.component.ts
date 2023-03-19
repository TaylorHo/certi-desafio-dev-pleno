import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserListService } from '@core/services/auth';
import { PROFILE } from '@models/auth';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent {
  constructor(
    private userListService: UserListService,
    private dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PROFILE,
  ) {}

  async save(formData: any) {
    const { success, user } = this.data
      ? await this.userListService.updateUser({
          ...this.data,
          name: formData?.name,
          role: formData?.role?.toString(),
        })
      : await this.userListService.addNewUser(formData);
    if (success) {
      this.dialogRef.close({ success: true, userData: user });
      if (this.data.role !== user.role) {
        window.location.reload();
      }
    }
  }
}
