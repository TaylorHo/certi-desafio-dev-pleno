import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../../dto/create-user.dto';
import { IUser } from '../../interface/user.interface';
import { Model } from 'mongoose';
import { UpdateUserDto } from '../../dto/update-user.dto';

/**
 * Serviço responsável por realizar as ações do CRUD de usuários.
 */
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  /**
   * Cria um novo usuário e retorna o usuário criado.
   */
  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const existingUser = await this.userModel.findOne({ email: createUserDto.email }).exec();
    if (!existingUser) {
      const newUser = new this.userModel(createUserDto);
      return newUser.save();
    } else {
      throw new ConflictException('Email já em uso!');
    }
  }

  /**
   * Atualiza um usuário e retorna os dados deste usuário.
   */
  async updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const existingUser = await this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true });
    if (!existingUser) {
      throw new NotFoundException(`Usuário #${userId} não encontrado`);
    }
    existingUser.password = null;
    return existingUser;
  }

  /**
   * Retorna todos os usuários disponíveis no banco de dados.
   */
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

  /**
   * Retorna um único usuário, baseado no seu ID.
   */
  async getUser(userId: string): Promise<IUser> {
    const existingUser = await this.userModel.findById(userId).exec();
    if (!existingUser) {
      throw new NotFoundException(`Usuário #${userId} não encontrado`);
    }
    existingUser.password = null;
    return existingUser;
  }

  /**
   * Retorna a senha do usuário, APENAS PARA USO INTERNO NA API.
   * Este método existe justamente todos os demais métodos excluírem as senhas da resposta, por questões de segurança.
   */
  async getPassword(userId: string): Promise<string> {
    const existingUser = await this.userModel.findById(userId).exec();
    if (!existingUser) {
      throw new NotFoundException(`Usuário #${userId} não encontrado`);
    }
    return existingUser.password;
  }

  /**
   * Exclui um usuário e retorna os dados do usuário excluído.
   */
  async deleteUser(userId: string): Promise<IUser> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new NotFoundException(`Usuário #${userId} não encontrado`);
    }
    deletedUser.password = null;
    return deletedUser;
  }
}
