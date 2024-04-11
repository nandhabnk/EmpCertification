export type RequestData = {
  reference_no: number;
  address_to: string;
  purpose: string;
  issued_on?: string;
  status: string;
};

export type RequestState = {
  allRequests: Array<RequestData>;
  currentRequest: RequestData;
};
