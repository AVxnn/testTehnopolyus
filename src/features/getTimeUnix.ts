export const getTimeUnix = (time: number) => {
  const dateObject = new Date(time);
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Месяц начинается с 0
  const day = dateObject.getDate().toString().padStart(2, "0");

  const formattedDate = `${day}.${month}.${year}`;
  return formattedDate;
};

export const getTimeHM = (time: number) => {
  const dateObject = new Date(time);
  const hours = dateObject.getHours().toString().padStart(2, "0");
  const minutes = dateObject.getMinutes().toString().padStart(2, "0");

  const formattedTime = `${hours}:${minutes}`;
  return formattedTime;
};
