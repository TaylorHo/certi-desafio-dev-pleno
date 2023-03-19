export interface ILog {
  readonly action: string;

  readonly payload: string;

  readonly response: string;
}

export interface ILogTimestamp extends ILog {
  readonly timestamp: string;
}
