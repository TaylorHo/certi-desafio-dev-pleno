import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateLogDto } from '../../dto/create-log.dto';
import { LoggerService } from '../../service/logger/logger.service';

@ApiTags('/api/v1/logs')
@ApiBearerAuth()
@Controller('logs')
export class LoggerController {
  constructor(private readonly loggerService: LoggerService) {}

  @Post()
  @ApiCreatedResponse({ description: 'Log criado com sucesso' })
  @ApiBadRequestResponse({ description: 'Log não criado!' })
  @ApiOperation({ summary: 'Criação de Log único', description: 'Endpoint responsável pela criação de um único log' })
  async createUser(@Res() response, @Body() createLogDto: CreateLogDto) {
    try {
      const newUser = await this.loggerService.createLog(createLogDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'O Log foi criado com sucesso',
        newUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Erro: Log não foi criado!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  @ApiOkResponse({ description: 'Lista de logs recuperada com sucesso' })
  @ApiBadRequestResponse({ description: 'Nenhum log foi encontrado!' })
  @ApiOperation({
    summary: 'Obter todos os logs',
    description: 'Endpoint responsável por recuperar todos os logs',
  })
  async getUsers(@Res() response) {
    try {
      const allLogs = await this.loggerService.getAllLogs();
      return response.status(HttpStatus.OK).json({
        message: 'Todos os logs foram encontrados com sucesso',
        allLogs,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Log recuperado com sucesso' })
  @ApiNotFoundResponse({ description: 'Log não encontrado!' })
  @ApiOperation({
    summary: 'Obter um Log único',
    description: 'Endpoint responsável por recuperar um único log',
  })
  async getUser(@Res() response, @Param('id') logID: string) {
    try {
      const existingLog = await this.loggerService.getLog(logID);
      return response.status(HttpStatus.OK).json({
        message: 'Log encontrado com sucesso.',
        existingLog,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
