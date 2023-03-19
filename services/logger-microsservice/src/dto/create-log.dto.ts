import { IsNumberString, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLogDto {
  @ApiProperty({
    type: String,
    description: 'Ação realizada na API de Usuários',
  })
  @IsString()
  @IsNotEmpty()
  readonly action: string;

  @ApiProperty({
    type: String,
    description: 'Timestamp da ação realizada.',
  })
  @IsNumberString()
  @IsNotEmpty()
  readonly timestamp: number;

  @ApiProperty({
    type: Number,
    description: 'Payload enviado para a API de Usuários.',
  })
  @IsString()
  @IsNotEmpty()
  readonly payload: number;

  @ApiProperty({
    type: String,
    description: 'HTTP Status Code enviado como resposta à requisição.',
  })
  @IsString()
  @IsNotEmpty()
  readonly responseStatus: string;
}
