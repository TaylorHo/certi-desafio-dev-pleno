import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LogsDto } from 'src/dto/logging.dto';
import { LoggerService } from 'src/service/logger/logger.service';

@Controller()
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @MessagePattern('log.create')
  async createLog(@Payload() log: LogsDto) {
    return await this.loggerService.createLog(log);
  }
}
