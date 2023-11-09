const convertDate = (dateInString) => {
  let date = new Date(dateInString);

  date = date.toString("fr-FR", { month: "long" });
  date = date.substr(4, 17);
  return date;
};

const formatDate = (rawDate) => {
  let date = new Date(rawDate);

  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${day} / ${month} / ${year}`;
};

export { convertDate, formatDate };
