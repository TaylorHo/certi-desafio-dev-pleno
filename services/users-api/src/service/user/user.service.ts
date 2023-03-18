import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../../dto/create-user.dto';
import { IUser } from '../../interface/user.interface';
import { Model } from 'mongoose';
import { UpdateUserDto } from '../../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const existingUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });
    if (!existingUser) {
      throw new NotFoundException(`Usuário #${userId} não encontrado`);
    }
    existingUser.password = null;
    return existingUser;
  }

  async getAllUsers(): Promise<IUser[]> {
    const userData = await this.userModel.find();
    if (!userData || userData.length == 0) {
      throw new NotFoundException('Dados de usuários não encontrados!');
    }
    userData.forEach((user) => {
      user.password = null;
    });
    return userData;
  }

  async getUser(userId: string): Promise<IUser> {
    const existingUser = await this.userModel.findById(userId).exec();
    if (!existingUser) {
      throw new NotFoundException(`Usuário #${userId} não encontrado`);
    }
    existingUser.password = null;
    return existingUser;
  }

  async getPassword(userId: string): Promise<string> {
    const existingUser = await this.userModel.findById(userId).exec();
    if (!existingUser) {
      throw new NotFoundException(`Usuário #${userId} não encontrado`);
    }
    return existingUser.password;
  }

  async deleteUser(userId: string): Promise<IUser> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new NotFoundException(`Usuário #${userId} não encontrado`);
    }
    deletedUser.password = null;
    return deletedUser;
  }
}
