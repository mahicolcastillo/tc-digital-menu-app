export interface BffResponse<T> {
  code    : number;
  message : string;
  payload : T;
}
