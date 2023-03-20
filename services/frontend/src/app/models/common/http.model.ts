/**
 * Interface das requisições HTTP
 */
export interface HTTP_REQ {
  url: string;
  params?: any;
  headers?: any;
  body?: any;
}

/**
 * Interface das respostas HTTP
 */
export interface HTTP_RES {
  success: boolean;
  data: any;
  error?: any;
}
