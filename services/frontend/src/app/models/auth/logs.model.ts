/**
 * Interface da estrutura dos Logs, para a página de listagem de logs.
 */
export interface LOG {
  id: string;
  action: string;
  payload: string;
  timestamp: number;
  response: number;
}
