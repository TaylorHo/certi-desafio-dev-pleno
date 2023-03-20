import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LogsDto } from 'src/dto/logging.dto';
import { ILog } from 'src/interface/log.interface';

/**
 * Serviço responsável por criar e retornar logs.
 */
@Injectable()
export class LoggerService {
  constructor(
    @Inject('LOGGER_MICROSSERVICE') private readonly loggerKafkaClient: ClientKafka,
    @InjectModel('Log') private loggerModel: Model<ILog>,
  ) {}

  /**
   * Cria um log como uma mensagem no kafka, para após isso o microsserviço de logs cadastrar o log.
   */
  public async createLog(log: LogsDto): Promise<LogsDto> {
    try {
      this.loggerKafkaClient.send('log.create', log).subscribe();
      return log;
    } catch (error) {
      throw new BadRequestException(`Não foi possível criar o log: ${error}`);
    }
  }

  /**
   * Retorna todos os logs disponíveis no banco de dados.
   */
  public async getLogs(): Promise<ILog[]> {
    const logData = await this.loggerModel.find();
    if (!logData || logData.length == 0) {
      throw new NotFoundException('Nenhum log encontrado!');
    }
    logData.forEach((log) => {
      log.id = log._id;
      delete log._id;
      delete log.__v;
    });
    return logData;
  }

  /**
   * Retorna um único log, baseado em seu ID.
   */
  public async getSingleLog(logID: string): Promise<ILog> {
    const existingLog = await this.loggerModel.findById(logID).exec();
    if (!existingLog) {
      throw new NotFoundException(`Log #${logID} não encontrado`);
    }
    existingLog.id = existingLog._id;
    delete existingLog._id;
    delete existingLog.__v;
    return existingLog;
  }
}
