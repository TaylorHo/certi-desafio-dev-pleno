import { Document } from 'mongoose';

export interface ILog extends Document {
  readonly action: string;

  readonly payload: any;

  readonly response: number;

  readonly timestamp?: number;
}
