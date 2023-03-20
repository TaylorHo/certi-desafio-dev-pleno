import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Objeto de Transferência de Dados que contém os dados utilizado no processo de login.
 */
export class AuthenticationLoginDto {
  @ApiProperty({
    type: String,
    description: 'E-mail do usuário para ser usado como login.',
  })
  @IsString()
  @MaxLength(30) // set limit to prevent Buffer Overflow attacks
  readonly email: string;

  @ApiProperty({
    type: String,
    description: 'Senha para Autenticação do Usuário.',
  })
  @IsString()
  @MaxLength(50) // set limit to prevent Buffer Overflow attacks
  password: string;
}

/**
 * Objeto de Transferência de Dados que contém os dados utilizado no processo de registro de usuário.
 */
export class AuthenticationRegisterDto extends AuthenticationLoginDto {
  @ApiProperty({
    type: String,
    description: 'Nome do usuário.',
  })
  @IsString()
  @MaxLength(30) // set limit to prevent Buffer Overflow attacks
  readonly name: string;
}
