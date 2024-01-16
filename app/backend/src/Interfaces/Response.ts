type ResponseErrorType =
'BAD_REQUEST' | 'UNAUTHORIZED' | 'NOT_FOUND' | 'CONFLICT' | 'INVALID_VALUE';

type ResponseSucessType = 'SUCESSFULL' | 'CREATED' | 'NO_CONTENT';

export type ResponseMessageType = { message: string };

export type ResponseMessageToken = { token: string };

export type ResponseError = {
  statusCode: ResponseErrorType,
  data: ResponseMessageType | ResponseMessageToken
};

export type ResponseSucess<T> = {
  statusCode: ResponseSucessType,
  data: T
};

export type Response<T> = ResponseError | ResponseSucess<T>;
