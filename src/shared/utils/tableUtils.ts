import { RequestData } from "../types/requestDetails";

export const dateFormatter = (date: Date) => {
  if (typeof date === "string") return date;
  const dd = date.getDate();
  const mm = date.getMonth() + 1;
  const yyyy = date.getFullYear();

  const formattedDate =
    mm.toString().padStart(2, "0") +
    "/" +
    dd.toString().padStart(2, "0") +
    "/" +
    yyyy;

  return formattedDate;
};

export const filterData = (text: string, requestArr: Array<RequestData>) => {
  const regexPattern = new RegExp(text);
  const filteredRequest = requestArr.filter((request) => {
    if (
      request.reference_no.toString() === text ||
      request.status.toLocaleLowerCase() === text ||
      regexPattern.test(request.address_to.toLocaleLowerCase())
    ) {
      return request;
    }
  });
  return filteredRequest;
};
