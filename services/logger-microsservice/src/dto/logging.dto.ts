import { IsNumberString, IsNotEmpty, IsString } from 'class-validator';

/**
 * Objeto de Transferência de Dados que contém os dados do Log.
 */
export class LogsDto {
  @IsString()
  @IsNotEmpty()
  readonly action: string;

  @IsNumberString()
  @IsNotEmpty()
  readonly timestamp: number;

  @IsString()
  @IsNotEmpty()
  readonly payload: string;

  @IsNumberString()
  @IsNotEmpty()
  readonly response: string;
}
