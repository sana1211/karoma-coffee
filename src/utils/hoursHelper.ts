import { OPENING_HOURS } from '../data/cafeData';

export interface CafeStatus {
  isOpen: boolean;
  message: string;
  nextEvent: string;
  currentDay: string;
  todayHours: { open: string; close: string };
}

export function getCurrentCafeStatus(): CafeStatus {
  const now = new Date();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = dayNames[now.getDay()];

  const todaySchedule = OPENING_HOURS.find(h => h.day === currentDay) || OPENING_HOURS[0];

  const [openHour, openMin] = todaySchedule.open.split(':').map(Number);
  const [closeHour, closeMin] = todaySchedule.close.split(':').map(Number);

  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = openHour * 60 + openMin;
  const closeMinutes = closeHour * 60 + closeMin;

  const isOpen = currentMinutes >= openMinutes && currentMinutes < closeMinutes;

  const formatTime12 = (h: number, m: number) => {
    const period = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    const minStr = m === 0 ? '' : `:${m < 10 ? '0' : ''}${m}`;
    return `${hour12}${minStr} ${period}`;
  };

  const closeFormatted = formatTime12(closeHour, closeMin);
  const openFormatted = formatTime12(openHour, openMin);

  return {
    isOpen,
    message: isOpen ? `Open Now` : `Closed Now`,
    nextEvent: isOpen ? `Closes at ${closeFormatted}` : `Opens at ${openFormatted}`,
    currentDay,
    todayHours: { open: todaySchedule.open, close: todaySchedule.close }
  };
}
