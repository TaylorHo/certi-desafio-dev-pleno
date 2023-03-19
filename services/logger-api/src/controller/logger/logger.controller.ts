import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  OnModuleDestroy,
  OnModuleInit,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LogsDto } from 'src/dto/logging.dto';
import { LoggerService } from 'src/service/logger/logger.service';

@ApiTags('/api/v1/logs')
@Controller('logs')
export class LoggerController implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly loggerService: LoggerService,
    @Inject('LOGGER_MICROSSERVICE') private readonly loggerKafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this.loggerKafkaClient.subscribeToResponseOf('log.create');
  }

  onModuleDestroy() {
    this.loggerKafkaClient.close();
  }

  @Post()
  @ApiOkResponse({ description: 'Log criado com sucesso' })
  @ApiBadRequestResponse({ description: 'Não foi possível criar o log!' })
  @ApiOperation({
    summary: 'Criar um log',
    description: 'Endpoint responsável por criar um log único',
  })
  async createLog(@Res() response, @Body() log: LogsDto) {
    try {
      const logData = await this.loggerService.createLog(log);
      return response.status(HttpStatus.OK).json({
        message: 'Log criado com sucesso',
        logData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  @ApiOkResponse({ description: 'Lista de logs recuperada com sucesso' })
  @ApiBadRequestResponse({ description: 'Nenhum log foi encontrado!' })
  @ApiOperation({
    summary: 'Obter todos os logs',
    description: 'Endpoint responsável por recuperar todos os logs',
  })
  async getAllLogs(@Res() response) {
    try {
      const logData = await this.loggerService.getLogs();
      return response.status(HttpStatus.OK).json({
        message: 'Todos os logs encontrados com sucesso',
        logData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Log recuperado com sucesso' })
  @ApiNotFoundResponse({ description: 'Log não encontrado!' })
  @ApiOperation({
    summary: 'Obter um único log',
    description: 'Endpoint responsável por recuperar um único log',
  })
  async getSingleLog(@Res() response, @Param('id') logID: string) {
    try {
      const existingLog = await this.loggerService.getSingleLog(logID);
      return response.status(HttpStatus.OK).json({
        message: 'Log encontrado com sucesso',
        existingLog,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
