export const getDaysInCurrentMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, i) => ({
    id: i + 1,
    date: new Date(year, month, i + 1),
  }));
};
