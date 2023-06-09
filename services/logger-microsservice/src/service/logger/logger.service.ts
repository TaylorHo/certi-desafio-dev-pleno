import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogsDto } from 'src/dto/logging.dto';
import { ILog } from 'src/interface/log.interface';

/**
 * Serviço de criação de Logs.
 */
@Injectable()
export class LoggerService {
  constructor(
    @Inject('LOGGER_MICROSSERVICE') private readonly loggerKafkaClient: ClientKafka,
    @InjectModel('Log') private loggerModel: Model<ILog>,
  ) {}

  /**
   * Registra um log no banco de dados e retorna os dados do log salvo.
   */
  public async createLog(log: LogsDto): Promise<ILog> {
    const newUser = new this.loggerModel(log);
    return newUser.save();
  }
}
