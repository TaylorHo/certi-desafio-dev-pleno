import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controller/user/user.controller';
import { UserSchema } from './schema/user.schema';
import { UserService } from './service/user/user.service';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './service/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controller/auth/auth.controller';
import { JwtStrategy } from './service/auth/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
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
  controllers: [UserController, AuthController],
  providers: [UserService, AuthService, JwtStrategy],
})
export class AppModule {}
