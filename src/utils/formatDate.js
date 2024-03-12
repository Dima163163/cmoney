const formatDate = date => {
  const d = Date.parse(date);
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('ru', options).format(new Date(d));
};

export const getMonth = (dateStr) => {
  const date = new Date(dateStr);
  return date.getMonth();
};

export const getYear = (dateStr) => {
  const date = new Date(dateStr);
  return date.getFullYear();
};

export default formatDate;
