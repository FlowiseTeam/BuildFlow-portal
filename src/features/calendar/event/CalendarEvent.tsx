import { CalendarEventType, ISODate } from '@src/services/api/routes/projects';

function getFromToDateString(from: ISODate, to: ISODate) {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}.${month}`;
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return `Od ${formatTime(fromDate)}, ${formatDate(fromDate)} do ${formatTime(toDate)}, ${formatDate(toDate)}`;
}

export function CalendarEvent({
  event,
  handleEventClick,
}: {
  event: CalendarEventType;
  handleEventClick: (event: CalendarEventType) => void;
}) {
  return (
    <li
      className="rounded transition-colors hover:cursor-pointer hover:bg-neutral-100"
      onClick={() => handleEventClick(event)}
    >
      <p className="font-semibold">{event.summary}</p>
      <p>{event.description}</p>
      <p>{getFromToDateString(event.start, event.end)}</p>
    </li>
  );
}
