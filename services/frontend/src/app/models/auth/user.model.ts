/**
 * Interface dos dados básicos do usuário
 */
export interface USER {
  id: number;
  email: string;
}

/**
 * Interface do perfil do usuário
 */
export interface PROFILE extends USER {
  name: string;
  role: number;
}
