import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ILog, ILogTimestamp } from 'src/interface/log.interface';

/**
 * Serviço responsável por gerar logs de tudo o que é realizado neste CRUD.
 */
@Injectable()
export class LoggerService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * Cria um log, utilizando informações do tipo ILog, fazendo uma requisição à API de Logs.
   */
  public async createLog(log: ILog): Promise<ILogTimestamp> {
    const logValue: ILogTimestamp = {
      action: log.action,
      payload: log.payload,
      response: log.response,
      timestamp: new Date().getTime().toString(),
    };

    const { data }: { data: ILogTimestamp } = await firstValueFrom(
      this.httpService.post<any>(`${process.env.LOGGER_API_HOST}/api/v1/logs`, logValue).pipe(
        catchError((error: AxiosError) => {
          console.log(error);
          throw new BadRequestException(`Não foi possível criar o log: ${error.message}`);
        }),
      ),
    );
    return data;
  }
}
