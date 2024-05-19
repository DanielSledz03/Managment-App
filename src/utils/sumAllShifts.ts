import { timeDifferenceArray } from './timeDifferenceArray';

export const sumAllShifts = async (data: { startTime: string; endTime: string }[]) => {
  const ms = timeDifferenceArray(data);

  const seconds = ms / 1000; // Konwertuj milisekundy na sekundy
  const minutes = Math.floor(seconds / 60); // Oblicz ile minut
  const hours = Math.floor(minutes / 60); // Oblicz ile godzin
  const minutesLeft = Math.floor(minutes % 60); // Oblicz pozostałe minuty po odjęciu godzin
  const secondsLeft = Math.floor(seconds % 60); // Oblicz pozostałe sekundy po odjęciu minut

  return {
    text: `${hours < 10 ? '0' + hours : hours}:${minutesLeft < 10 ? '0' + minutesLeft : minutesLeft}:${secondsLeft < 10 ? '0' + secondsLeft : secondsLeft}`,
    hours,
  };
};
