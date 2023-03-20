/**
 * Interface dos dados utilizados no formulário de login
 */
export interface LOGIN_FORM_DATA {
  email: string;
  password: string;
}

/**
 * Interface dos dados utilizados no formulário de registro de usuário
 */
export interface REGISTER_FORM_DATA extends LOGIN_FORM_DATA {
  name: string;
  passwordConfirm?: string;
  role?: number;
}
