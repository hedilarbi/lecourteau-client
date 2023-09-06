const restaurantOpenStatus = (working_hours) => {
  const now = new Date();
  const openTime = new Date();
  openTime.setHours(
    parseInt(working_hours.open.hours, 10),
    parseInt(working_hours.open.minutes, 10),
    0,
    0
  );

  const closeTime = new Date();
  closeTime.setHours(
    parseInt(working_hours.close.hours, 10),
    parseInt(working_hours.close.minutes, 10),
    0,
    0
  );

  return now >= openTime && now <= closeTime;
};

export { restaurantOpenStatus };
