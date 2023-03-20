import { Document } from 'mongoose';

/**
 * Interface utilizada pelo Model do Mongoose para Logs.
 */
export interface ILog extends Document {
  readonly action: string;

  readonly payload: string;

  readonly response: number;

  readonly timestamp: number;
}
