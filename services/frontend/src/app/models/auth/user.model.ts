export interface USER {
  id: number;
  email: string;
}

export interface PROFILE extends USER {
  name: string;
  role: number;
}
