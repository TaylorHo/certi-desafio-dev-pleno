import { Module } from '@nestjs/common';
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
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule.register({
      timeout: 20 * 1000, // 20 mil milisegundos = 20 segundos
      maxRedirects: 3,
    }),
    MongooseModule.forRoot(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`, {
      dbName: process.env.DB_DBNAME,
      useNewUrlParser: true,
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [UserService, AuthService, JwtStrategy, LoggerService],
})
export class AppModule {}
