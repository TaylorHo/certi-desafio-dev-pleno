import { IsNumberString, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LogsDto {
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
  readonly payload: string;

  @ApiProperty({
    type: String,
    description: 'HTTP Status Code enviado como resposta à requisição.',
  })
  @IsNumberString()
  @IsNotEmpty()
  readonly response: string;
}
