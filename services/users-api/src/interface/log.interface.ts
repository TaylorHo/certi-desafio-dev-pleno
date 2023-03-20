/**
 * Interface dos dados utilizados pelo serviço de geração de logs da aplicação.
 */
export interface ILog {
  readonly action: string;

  readonly payload: string;

  readonly response: string;
}

/**
 * Interface dos dados utilizados para requisições à API de geração de logs via messageria.
 */
export interface ILogTimestamp extends ILog {
  readonly timestamp: string;
}
