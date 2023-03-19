import { Body, Controller, Post, Res } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthenticationLoginDto, AuthenticationRegisterDto } from 'src/dto/authentication.dto';
import { AuthService } from 'src/service/auth/auth.service';

@ApiTags('/api/v1/auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({
    summary: 'Autenticação de um usuário',
    description: 'Endpoint responsável pela autenticação do usuário',
  })
  @ApiOkResponse({ description: 'Login realizado com sucesso' })
  @ApiUnauthorizedResponse({ description: 'Falha no login' })
  async login(@Res() res, @Body() req: AuthenticationLoginDto) {
    return this.authService.login(req, res);
  }

  @Post('/register')
  @ApiOperation({ summary: 'Registrar um usuário', description: 'Endpoint responsável pelo registro do usuário' })
  @ApiCreatedResponse({ description: 'Usuário criado com sucesso' })
  @ApiConflictResponse({ description: 'Email já em uso' })
  @ApiResponse({
    status: 424,
    description: 'Falha no registro de usuário',
  })
  async register(@Res() res, @Body() req: AuthenticationRegisterDto) {
    return this.authService.register(req, res);
  }
}
