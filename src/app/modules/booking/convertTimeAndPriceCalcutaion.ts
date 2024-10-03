import moment from "moment";

const timeToMinutesORHour = (time: string) => {
  const duration = moment.duration(time);
  const differenceInHours = (duration.asMinutes() / 60).toFixed(2);
  return parseFloat(differenceInHours);
};

export const calculateTotalCost = (
  startTime: string,
  endTime: string,
  pricePerHour: number
): number => {
  const startTimeInHours: number = timeToMinutesORHour(startTime);
  const endTimeInHours: number = timeToMinutesORHour(endTime);
  const differenceInHours: number = endTimeInHours - startTimeInHours;
  const totalCost: number = Math.round(differenceInHours * pricePerHour);
  return totalCost;
};
