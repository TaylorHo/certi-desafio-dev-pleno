import { Document } from 'mongoose';

export interface ILog extends Document {
  readonly action: string;

  readonly payload: string;

  readonly response: number;

  readonly timestamp: number;
}
