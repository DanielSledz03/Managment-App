export function timeDiff(date: string): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 60) {
    return `${minutes} minut temu`;
  } else if (hours < 24) {
    return `${hours} godzin temu`;
  } else if (days < 2) {
    return 'wczoraj';
  } else {
    return `${days} dni temu`;
  }
}
