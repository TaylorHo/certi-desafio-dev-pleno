import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { AuthService } from 'src/service/auth/auth.service';
import { LoggerService } from 'src/service/logger/logger.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { UserService } from '../../service/user/user.service';

@ApiTags('/api/v1/users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly loggerService: LoggerService,
  ) {}

  /**
   * Endpoint do tipo POST responsável pela criação de um usuário.
   */
  @Post()
  @ApiCreatedResponse({ description: 'Usuário criado com sucesso' })
  @ApiBadRequestResponse({ description: 'Usuário não criado!' })
  @ApiOperation({ summary: 'Criação de usuário', description: 'Endpoint responsável pela criação de um único usuário' })
  @UseGuards(JwtAuthGuard)
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      createUserDto.password = await this.authService.encryptPassword(createUserDto.password);
      const newUser = await this.userService.createUser(createUserDto);
      newUser.password = null;
      await this.loggerService.createLog({
        action: '(POST) /api/v1/users',
        response: '200',
        payload: JSON.stringify(createUserDto),
      });
      return response.status(HttpStatus.CREATED).json({
        message: 'O usuário foi criado com sucesso',
        newUser,
      });
    } catch (err) {
      await this.loggerService.createLog({
        action: '(POST) /api/v1/users',
        response: HttpStatus.BAD_REQUEST.toString(),
        payload: JSON.stringify(createUserDto),
      });
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Erro: Usuário não foi criado!',
        error: 'Bad Request',
      });
    }
  }

  /**
   * Endpoint do tipo PUT responsável pela edição de um usuário.
   */
  @Put('/:id')
  @ApiOkResponse({ description: 'Usuário atualizado com sucesso' })
  @ApiBadRequestResponse({ description: 'Usuário não atualizado!' })
  @ApiOperation({ summary: 'Editar um usuário', description: 'Endpoint responsável pela edição de um único usuário' })
  @UseGuards(JwtAuthGuard)
  async updateUser(@Res() response, @Param('id') userId: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      if (updateUserDto.password) {
        updateUserDto.password = await this.authService.encryptPassword(updateUserDto.password);
      } else {
        updateUserDto.password = await this.userService.getPassword(userId);
      }
      const existingUser = await this.userService.updateUser(userId, updateUserDto);
      await this.loggerService.createLog({
        action: `(PUT) /api/v1/users/${userId}`,
        response: '200',
        payload: JSON.stringify(updateUserDto),
      });
      return response.status(HttpStatus.OK).json({
        message: 'O usuário foi atualizado com sucesso',
        existingUser,
      });
    } catch (err) {
      await this.loggerService.createLog({
        action: `(PUT) /api/v1/users/${userId}`,
        response: '404',
        payload: JSON.stringify(updateUserDto),
      });
      return response.status(err.status).json(err.response);
    }
  }

  /**
   * Endpoint do tipo GET responsável por retornar todos os usuários.
   */
  @Get()
  @ApiOkResponse({ description: 'Lista de usuários recuperada com sucesso' })
  @ApiBadRequestResponse({ description: 'Nenhum usuário foi encontrado!' })
  @ApiOperation({
    summary: 'Obter todos os usuários',
    description: 'Endpoint responsável por recuperar todos os usuários',
  })
  @UseGuards(JwtAuthGuard)
  async getUsers(@Res() response) {
    try {
      const userData = await this.userService.getAllUsers();
      await this.loggerService.createLog({
        action: '(GET) /api/v1/users',
        response: '200',
        payload: '{}',
      });
      return response.status(HttpStatus.OK).json({
        message: 'Todos os dados dos usuários encontrados com sucesso',
        userData,
      });
    } catch (err) {
      await this.loggerService.createLog({
        action: '(GET) /api/v1/users',
        response: '404',
        payload: '{}',
      });
      return response.status(err.status).json(err.response);
    }
  }

  /**
   * Endpoint do tipo GET responsável por retornar um único usuário.
   */
  @Get('/:id')
  @ApiOkResponse({ description: 'Usuário recuperado com sucesso' })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado!' })
  @ApiOperation({
    summary: 'Obter um único usuário',
    description: 'Endpoint responsável por recuperar um único usuário',
  })
  @UseGuards(JwtAuthGuard)
  async getUser(@Res() response, @Param('id') userId: string) {
    try {
      const existingUser = await this.userService.getUser(userId);
      await this.loggerService.createLog({
        action: `(GET) /api/v1/users/${userId}`,
        response: '200',
        payload: '{}',
      });
      return response.status(HttpStatus.OK).json({
        message: 'Usuário encontrado com sucesso',
        existingUser,
      });
    } catch (err) {
      await this.loggerService.createLog({
        action: `(GET) /api/v1/users/${userId}`,
        response: '404',
        payload: '{}',
      });
      return response.status(err.status).json(err.response);
    }
  }

  /**
   * Endpoint do tipo DELETE responsável por excluir um usuário.
   */
  @Delete('/:id')
  @ApiOkResponse({ description: 'Usuário excluído com sucesso' })
  @ApiBadRequestResponse({ description: 'Usuário não excluído!' })
  @ApiOperation({
    summary: 'Excluir um único usuário',
    description: 'Endpoint responsável pela exclusão de um único usuário',
  })
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Res() response, @Param('id') userId: string) {
    try {
      const deletedUser = await this.userService.deleteUser(userId);
      await this.loggerService.createLog({
        action: `(DELETE) /api/v1/users/${userId}`,
        response: '200',
        payload: '{}',
      });
      return response.status(HttpStatus.OK).json({
        message: 'Usuário excluído com sucesso',
        deletedUser,
      });
    } catch (err) {
      await this.loggerService.createLog({
        action: `(DELETE) /api/v1/users/${userId}`,
        response: '404',
        payload: '{}',
      });
      return response.status(err.status).json(err.response);
    }
  }
}
