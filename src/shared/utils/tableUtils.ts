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
