import { Document } from 'mongoose';

/**
 * Interface dos logs a serem inseridos no banco de dados.
 */
export interface ILog extends Document {
  readonly action: string;

  readonly payload: string;

  readonly response: number;

  readonly timestamp?: number;
}
