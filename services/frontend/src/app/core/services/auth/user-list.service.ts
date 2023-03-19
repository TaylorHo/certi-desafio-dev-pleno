import { Injectable } from '@angular/core';
import { ApiService } from '../common';
import { SnackMessageService } from '../notifcation';
import { HTTP_REQ } from '@models/common';
import { PROFILE, REGISTER_FORM_DATA } from '@models/auth';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  constructor(private apiService: ApiService, private snackMessage: SnackMessageService) {}

  // LIST USERS
  public async getAllUsers(): Promise<PROFILE[]> {
    const httpData: HTTP_REQ = {
      url: 'user',
    };
    const { success, data } = await this.apiService.get(httpData);
    if (success && data?.userData) {
      return data.userData.map((user: any) => {
        const userId = user._id;
        delete user.password; // delete because API send it to us as "null"
        delete user.__v;
        delete user._id;
        return {
          id: userId,
          ...user,
        };
      });
    } else {
      this.snackMessage.show({
        message: 'Falha durante a listagem de usuários',
      });
      return [];
    }
  }

  // ADD NEW USER
  public async addNewUser(formData: REGISTER_FORM_DATA): Promise<{ success: boolean; user: PROFILE }> {
    const httpData: HTTP_REQ = {
      url: 'user',
      body: {
        email: formData?.email,
        password: formData?.password,
        role: formData?.role?.toString() || '1',
        name: formData?.name,
      },
    };
    const { success, data } = await this.apiService.post(httpData);
    if (success && data?.newUser) {
      this.snackMessage.show({
        message: `O usuário "${formData?.name}" foi criado`,
      });
      const userId = data.newUser._id;
      delete data.newUser.password; // delete because API send it to us as "null"
      delete data.newUser.__v;
      delete data.newUser._id;
      return {
        success: true,
        user: {
          id: userId,
          ...data.newUser,
        },
      };
    } else {
      this.snackMessage.show({
        message: 'Falha no registro',
      });
      return { success: false, user: data };
    }
  }

  public async updateUser(user: PROFILE): Promise<{ success: boolean; user: PROFILE }> {
    const httpData: HTTP_REQ = {
      url: `user/${user.id}`,
      body: {
        ...user,
      },
    };
    const { success, data } = await this.apiService.put(httpData);
    if (success && data?.existingUser) {
      const userId = data.existingUser._id;
      delete data.existingUser.password; // delete because API send it to us as "null"
      delete data.existingUser.__v;
      delete data.existingUser._id;
      return {
        success: true,
        user: {
          id: userId,
          ...data.existingUser,
        },
      };
    } else {
      this.snackMessage.show({
        message: 'Falha na edição de usuário',
      });
      return { success: false, user: data };
    }
  }

  public async deleteUser(userID: number): Promise<{ success: boolean; user: PROFILE }> {
    const httpData: HTTP_REQ = {
      url: `user/${userID}`,
    };
    const { success, data } = await this.apiService.delete(httpData);
    if (success && data?.deletedUser) {
      const userId = data.deletedUser._id;
      delete data.deletedUser.password; // delete because API send it to us as "null"
      delete data.deletedUser.__v;
      delete data.deletedUser._id;
      return {
        success: true,
        user: {
          id: userId,
          ...data.existingUser,
        },
      };
    } else {
      this.snackMessage.show({
        message: 'Falha na remoção de usuário',
      });
      return { success: false, user: data };
    }
  }
}
