import { Document } from 'mongoose';

export interface ILog extends Document {
  readonly action: string;

  readonly timestamp: number;

  readonly payload: string;

  readonly responseStatus: string;
}
