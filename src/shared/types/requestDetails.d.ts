export type RequestBody = {
  address_to: string;
  purpose: string;
  issued_on: string;
  employee_id: string;
};

export type RequestData = {
  reference_no: number;
  address_to: string;
  purpose: string;
  issued_on?: string | Date;
  status: string;
};

export type RequestState = {
  allRequests: Array<RequestData>;
  currentRequest: RequestData;
};
