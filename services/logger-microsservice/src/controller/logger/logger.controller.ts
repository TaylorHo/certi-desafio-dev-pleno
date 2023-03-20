import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LogsDto } from 'src/dto/logging.dto';
import { LoggerService } from 'src/service/logger/logger.service';

/**
 * Controller responsável pela criação de logs baseados nas mensagens publicadas no Kafka.
 */
@Controller()
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  /**
   * Criação de um log ao receber uma mensagem no Tópico log.create do kafka.
   */
  @MessagePattern('log.create')
  async createLog(@Payload() log: LogsDto) {
    return await this.loggerService.createLog(log);
  }
}
