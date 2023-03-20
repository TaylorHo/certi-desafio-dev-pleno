import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

/**
 * Mongoose Schema utilizado para a criação de listagem de Logs.
 */
@Schema()
export class Logger {
  @Prop()
  action: string;

  @Prop()
  timestamp: number;

  @Prop()
  payload: string;

  @Prop()
  response: string;
}

export const LoggerSchema = SchemaFactory.createForClass(Logger);
