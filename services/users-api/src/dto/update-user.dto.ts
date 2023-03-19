import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({
    type: String,
    description: 'Nome do usuário.',
  })
  @IsString()
  @IsOptional()
  @MaxLength(30) // set limit to prevent Buffer Overflow attacks
  readonly name: string;

  @ApiPropertyOptional({
    type: String,
    description: 'E-mail do usuário para ser usado como login.',
  })
  @IsString()
  @IsOptional()
  @MaxLength(30) // set limit to prevent Buffer Overflow attacks
  readonly email: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'ID da função do usuário',
  })
  @IsNumberString()
  @IsOptional()
  readonly role: number;

  @ApiPropertyOptional({
    type: String,
    description: 'Senha para Autenticação do Usuário.',
  })
  @IsString()
  @IsOptional()
  @MaxLength(50) // set limit to prevent Buffer Overflow attacks
  password: string;
}
