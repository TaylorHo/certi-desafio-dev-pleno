import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserListService } from '@core/services/auth';
import { SnackMessageService } from '@core/services/notifcation';
import { PROFILE } from '@models/auth';
import { UserModal } from './components';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  public userList!: PROFILE[];

  constructor(
    private userListService: UserListService,
    private dialog: MatDialog,
    private messageService: SnackMessageService,
  ) {}

  async ngOnInit() {
    this.userList = await this.userListService.getAllUsers();
  }

  public async createNewUser() {
    try {
      const { success, userData } = await this.openUserModal();
      if (success) {
        this.userList.push(userData);
      }
    } catch (error: any) {
      this.messageService.show({
        message: error?.message || 'Ocorreu um erro ao criar um novo usuário',
      });
    }
  }

  public async updateUser(user: PROFILE) {
    try {
      const { success, userData } = await this.openUserModal(user);
      if (success) {
        const userIndex = this.userList.findIndex((usr) => usr?.id === user?.id);
        if (userIndex >= 0) {
          this.userList[userIndex] = userData;
          this.messageService.show({
            message: `O usuário "${userData?.name}" foi atualizado com sucesso`,
            duration: 4000,
          });
        }
      }
    } catch (error: any) {
      this.messageService.show({
        message: error?.message || 'Ocorreu um erro ao atualizar o usuário',
      });
    }
  }

  public async deleteUser(userData: PROFILE) {
    const { success } = await this.userListService.deleteUser(userData?.id);
    if (success) {
      const userIndex = this.userList.findIndex((usr) => usr.id === userData?.id);
      if (userIndex >= 0) {
        this.userList.splice(userIndex, 1);
        this.messageService.show({
          message: `O usuário "${userData?.name}" foi removido com sucesso`,
        });
      }
    }
  }

  // OPEN MODAL WITH SOME CONFIGRATION
  private async openUserModal(user?: PROFILE) {
    const userDialog = this.dialog.open(UserModal, {
      width: '450px',
      maxWidth: '100%',
      data: user,
      disableClose: true,
    });
    return await userDialog.afterClosed().toPromise();
  }
}
