interface ListRequestParams {
  page?: number;
  size?: number;
}

interface BatchRequestPayload {
  ids: string[];
}

interface BatchRequestPayloadWithData<T = any> extends BatchRequestPayload {
  data: T;
  fields: string[];
}

type BatchRequestPayloadWithJsonStringData = BatchRequestPayloadWithData<string>;

interface Response {
  status: string;
  message: string;
  error?: string;
}

type HttpResponse = Response;

interface ResponseWithData<T = any> extends Response {
  data?: T;
}

interface ListResponseWithData<T = any> extends ResponseWithData {
  data?: T[];
  total: number;
}
