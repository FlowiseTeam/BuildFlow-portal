import { CalendarEventType, ISODate } from '@src/services/api/routes/projects';

function getFromToDateString(from: ISODate, to: ISODate) {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return `${formatTime(fromDate)}-${formatTime(toDate)}`;
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
      className="rounded px-2 transition-colors hover:cursor-pointer hover:bg-primary/20"
      onClick={() => handleEventClick(event)}
    >
      <p className="font-semibold">{event.summary}</p>
      <div className="flex gap-2">
        <span>{getFromToDateString(event.start, event.end)}</span>
        <span>|</span>
        <span>{event.location}</span>
      </div>
    </li>
  );
}
