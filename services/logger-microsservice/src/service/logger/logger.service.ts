import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLogDto } from '../../dto/create-log.dto';
import { ILog } from '../../interface/logger.interface';
import { Model } from 'mongoose';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class LoggerService {
  constructor(
    @InjectModel('Logger') private loggerModel: Model<ILog>,
    @Inject('LOGGER_MICROSSERVICE') private readonly loggerKafkaClient: ClientKafka,
  ) {}

  async createLog(createLogDto: CreateLogDto): Promise<ILog> {
    this.loggerKafkaClient.emit('create_log', JSON.stringify(createLogDto));
    const newLog = new this.loggerModel(createLogDto);
    return newLog.save();
  }

  async getAllLogs(): Promise<ILog[]> {
    const logData = await this.loggerModel.find();
    if (!logData || logData.length == 0) {
      throw new NotFoundException('Nenhum log encontrado!');
    }
    return logData;
  }

  async getLog(logID: string): Promise<ILog> {
    const existingLog = await this.loggerModel.findById(logID).exec();
    if (!existingLog) {
      throw new NotFoundException(`Log #${logID} não encontrado`);
    }
    return existingLog;
  }
}
