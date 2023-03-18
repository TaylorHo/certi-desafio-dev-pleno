import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  role: number;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
