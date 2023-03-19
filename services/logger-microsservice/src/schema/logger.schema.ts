import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
