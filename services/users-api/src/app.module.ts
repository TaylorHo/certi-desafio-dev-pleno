import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './controller/users/users.controller';
import { UserSchema } from './schema/user.schema';
import { UserService } from './service/user/user.service';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './service/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth/auth.controller';
import { JwtStrategy } from './service/auth/jwt.strategy';
import { LoggerService } from './service/logger/logger.service';
import { LoggerController } from './controller/logger/logger.controller';
import { LoggerSchema } from './schema/logger.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`, {
      dbName: process.env.DB_DBNAME,
      useNewUrlParser: true,
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Log', schema: LoggerSchema }]),
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '3600s' },
    }),
    ClientsModule.register([
      {
        name: 'LOGGER_MICROSSERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'logger',
            brokers: ['localhost:9092'],
          },
          producerOnlyMode: true,
          consumer: {
            groupId: 'logger-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [UsersController, AuthController, LoggerController],
  providers: [UserService, AuthService, JwtStrategy, LoggerService],
})
export class AppModule {}
