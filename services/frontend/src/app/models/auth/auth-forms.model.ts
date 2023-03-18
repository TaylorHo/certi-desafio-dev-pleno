export interface LOGIN_FORM_DATA {
  email: string;
  password: string;
}

export interface REGISTER_FORM_DATA extends LOGIN_FORM_DATA {
  name: string;
  passwordConfirm?: string;
  role?: number;
}
