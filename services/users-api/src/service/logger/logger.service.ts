import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogsDto } from 'src/dto/logging.dto';
import { ILog } from 'src/interface/log.interface';

@Injectable()
export class LoggerService {
  constructor(
    @Inject('LOGGER_MICROSSERVICE') private readonly loggerKafkaClient: ClientKafka,
    @InjectModel('Log') private loggerModel: Model<ILog>,
  ) {}

  public createLog(log: LogsDto): void {
    const logValue: LogsDto = {
      action: log.action,
      payload: log.payload,
      response: log.response.toString(),
      timestamp: new Date().getTime(),
    };
    this.loggerKafkaClient.emit('create_log', JSON.stringify(logValue));
  }

  public async getLogs(): Promise<ILog[]> {
    const logData = await this.loggerModel.find();
    if (!logData || logData.length == 0) {
      throw new NotFoundException('Nenhum log encontrado!');
    }
    return logData;
  }

  public async getSingleLog(logID: string): Promise<ILog> {
    const existingLog = await this.loggerModel.findById(logID).exec();
    if (!existingLog) {
      throw new NotFoundException(`Log #${logID} não encontrado`);
    }
    return existingLog;
  }
}
