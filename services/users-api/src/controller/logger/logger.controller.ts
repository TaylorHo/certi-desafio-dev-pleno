import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggerService } from 'src/service/logger/logger.service';

@ApiTags('/api/v1/logs')
@Controller('logs')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Get()
  @ApiOkResponse({ description: 'Lista de logs recuperada com sucesso' })
  @ApiBadRequestResponse({ description: 'Nenhum log foi encontrado!' })
  @ApiOperation({
    summary: 'Obter todos os logs',
    description: 'Endpoint responsável por recuperar todos os logs',
  })
  async getUsers(@Res() response) {
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
  async getUser(@Res() response, @Param('id') logID: string) {
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
