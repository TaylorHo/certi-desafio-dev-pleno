import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

/**
 * Mongoose Schema para o CRUD de usuários.
 */
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
