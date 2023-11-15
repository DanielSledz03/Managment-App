export const formatTimeDiff = (start: Date | null, current: Date | null): string => {
  if (!start || !current) return '00:00:00';

  let diff = current.getTime() - start.getTime();
  let hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);
  let minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);
  let seconds = Math.floor(diff / 1000);

  // Convert numbers to strings and pad with zero if needed
  const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
  const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondsStr = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${hoursStr}:${minutesStr}:${secondsStr}`;
};
