import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/interface/user.interface';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthenticationLoginDto, AuthenticationRegisterDto } from 'src/dto/authentication.dto';
import { LoggerService } from '../logger/logger.service';

/**
 * Serviço responsável pelas ações de autenticação, como login, registro e verificações de credenciais de acesso.
 */
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly loggerService: LoggerService,
  ) {}

  /**
   * Realiza o login do usuário, utilizando um AuthenticationLoginDto.
   */
  public async login(user: AuthenticationLoginDto, response: any) {
    const existingUser = await this.userModel.findOne({ email: user.email }).exec();
    const userPayloadLog = {
      password: 'redacted_for_privacy',
      email: user.email,
    };

    if (existingUser) {
      const isTheSamePassword = await this.comparePasswords(existingUser.password, user.password);
      if (isTheSamePassword) {
        const payload = { email: user.email, id: existingUser._id };
        await this.loggerService.createLog({
          action: '(POST) /api/v1/login',
          response: HttpStatus.OK.toString(),
          payload: JSON.stringify(userPayloadLog),
        });
        return response.status(HttpStatus.OK).json({
          access_token: this.jwtService.sign(payload),
          id: payload.id,
        });
      }
    }

    await this.loggerService.createLog({
      action: '(POST) /api/v1/login',
      response: HttpStatus.UNAUTHORIZED.toString(),
      payload: JSON.stringify(userPayloadLog),
    });

    return response.status(HttpStatus.UNAUTHORIZED).json({
      statusCode: 401,
      message: 'Erro: Falha na autenticação!',
      error: 'Not Authorized',
    });
  }

  /**
   * Realiza o registro de um usuário, utilizando um AuthenticationRegisterDto.
   */
  public async register(user: AuthenticationRegisterDto, response: any) {
    const existingUser = await this.userModel.findOne({ email: user.email }).exec();
    const userPayloadLog = {
      password: 'redacted_for_privacy',
      email: user.email,
    };

    if (existingUser) {
      // Email já em uso
      await this.loggerService.createLog({
        action: '(POST) /api/v1/register',
        response: HttpStatus.CONFLICT.toString(),
        payload: JSON.stringify(userPayloadLog),
      });
      return response.status(HttpStatus.CONFLICT).json({
        statusCode: 409,
        message: 'Erro: Email já em uso!',
        error: 'Conflict',
      });
    } else {
      const encryptedPassword = await this.encryptPassword(user.password);
      const userInfo: CreateUserDto = {
        name: user.name,
        role: 1,
        email: user.email,
        password: encryptedPassword,
      };

      try {
        const createdUser: IUser = await this.userService.createUser(userInfo);
        const payload = { email: createdUser.email, id: createdUser._id };
        await this.loggerService.createLog({
          action: '(POST) /api/v1/register',
          response: HttpStatus.CREATED.toString(),
          payload: JSON.stringify(userPayloadLog),
        });
        return response.status(HttpStatus.CREATED).json({
          access_token: this.jwtService.sign(payload),
          id: payload.id,
        });
      } catch (error) {
        await this.loggerService.createLog({
          action: '(POST) /api/v1/register',
          response: HttpStatus.FAILED_DEPENDENCY.toString(),
          payload: JSON.stringify(userPayloadLog),
        });
        return response.status(HttpStatus.FAILED_DEPENDENCY).json({
          statusCode: 424,
          message: 'Erro: Falha na criação do recurso!',
          error: 'Failed Dependency',
        });
      }
    }
  }

  /**
   * Recebe uma senha em plaintext e converte para uma senha criptografada, utilizando 12 salts e o segrede definido no arquivo .env
   */
  public async encryptPassword(password: string): Promise<string> {
    const saltOrRounds = 12;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  /**
   * Compara a senha em plaintext com a senha criptografada, salva no banco de dados.
   */
  private async comparePasswords(hashedPassword: string, textPassword: string): Promise<boolean> {
    const hash = await bcrypt.compare(textPassword, hashedPassword);
    return hash;
  }
}
