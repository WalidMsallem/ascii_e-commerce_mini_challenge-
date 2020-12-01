const renderSize = (size) => {
  return `${size}px`;
};

const renderPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

const renderHumanizedDate = (dateAsString) => {
  const date = new Date(new Date(dateAsString).setHours(0, 0, 0, 0));
  const timestamp = Number(date);
  const today = new Date();
  const todayTimestamp = today.setHours(0, 0, 0, 0);
  const durationInMs = todayTimestamp - timestamp;
  const durationInDays = durationInMs / 1000 / 60 / 60 / 24;
  if (durationInDays === 0) {
    return "Added today";
  }
  if (durationInDays === 1) {
    return "Added yesterday";
  }
  if (durationInDays <= 7) {
    return `Added ${durationInDays} days ago`;
  }

  const dayOfMonth = date.getDate();
  const monthAsNumber = date.getMonth();
  const month = months[monthAsNumber];
  const year = date.getFullYear();
  const thisYear = today.getFullYear();

  if (year === thisYear) {
    return `added on ${dayOfMonth} ${month}`;
  }
  return `added on ${dayOfMonth} ${month} ${year}`;
};

const renderFullDate = (dateAsString) => {
  const date = new Date(dateAsString);
  const dayOfMonth = date.getDate();
  const monthAsNumber = date.getMonth();
  const month = months[monthAsNumber];
  const year = date.getFullYear();

  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${dayOfMonth}-${month}-${year} at ${hour}:${minute}`;
};
