import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerController } from './controller/logger/logger.controller';
import { LoggerSchema } from './schema/logger.schema';
import { LoggerService } from './service/logger/logger.service';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`, {
      dbName: process.env.DB_DBNAME,
      useNewUrlParser: true,
    }),
    MongooseModule.forFeature([{ name: 'Logger', schema: LoggerSchema }]),
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
  controllers: [LoggerController],
  providers: [LoggerService],
})
export class AppModule {}
