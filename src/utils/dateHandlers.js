const convertDate = (dateInString) => {
  const date = new Date(dateInString);
  return date.toLocaleString("fr-FR");
};

const formatDate = (rawDate) => {
  let date = new Date(rawDate);

  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDay();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${day} / ${month} / ${year}`;
};

export { convertDate, formatDate };
