import { Document } from 'mongoose';

/**
 * Interface dos dados utilizado no Model do mongoDB, para o CRUD de usuários no Banco de Dados.
 */
export interface IUser extends Document {
  readonly name: string;

  readonly email: string;

  readonly role: number;

  password: string;
}
