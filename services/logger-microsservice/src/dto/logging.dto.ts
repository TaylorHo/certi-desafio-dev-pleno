import { IsNumberString, IsNotEmpty, IsString } from 'class-validator';

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
