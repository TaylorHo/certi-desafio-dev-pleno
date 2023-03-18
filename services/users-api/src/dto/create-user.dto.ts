import { IsNumberString, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    description: 'Nome do usuário.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30) // set limit to prevent Buffer Overflow attacks
  readonly name: string;

  @ApiProperty({
    type: String,
    description: 'E-mail do usuário para ser usado como login.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(30) // set limit to prevent Buffer Overflow attacks
  readonly email: string;

  @ApiProperty({
    type: Number,
    description: 'ID da função do usuário',
  })
  @IsNumberString()
  @IsNotEmpty()
  readonly role: number;

  @ApiProperty({
    type: String,
    description: 'Senha para Autenticação do Usuário.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(50) // set limit to prevent Buffer Overflow attacks
  password: string;
}
