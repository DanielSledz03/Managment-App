export function timeDifferenceArray(data: { startTime: string; endTime: string }[]) {
  const timeDifferences = data.map((entry) => {
    const startTime = new Date(entry.startTime).getTime();
    const endTime = new Date(entry.endTime).getTime();
    return endTime - startTime;
  });

  const totalDifference = timeDifferences.reduce((acc, current) => acc + current, 0);

  return totalDifference;
}
