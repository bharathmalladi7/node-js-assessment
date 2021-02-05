export interface RequestModel {
  data: string;
}

interface ResponseData {
  firstName: string;
  lastName: string;
  clientId: string;
}

export interface ResponseModel {
  statusCode: 200;
  data: ResponseData;
}
