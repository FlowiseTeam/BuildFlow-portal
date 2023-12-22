import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { Button } from '@src/components/button/Button';

interface CalendarEvent {
  name: string;
  id: number;
}

interface CalendarDay {
  date: string;
  id: number;
  events: CalendarEvent[];
}

export function CalendarEventsHeader() {
  return (
    <div className="mb-6 flex items-center justify-between">
      <p className="text-sm uppercase tracking-widest text-gray-600">Terminy</p>
      <CalendarDaysIcon className="h-6 text-primary" />
    </div>
  );
}

export function CalendarDay({ day }: { day: CalendarDay }) {
  return (
    <div className="mb-6">
      <p className="mb-1 text-xl font-medium text-primary">{day.date}</p>
      <ul className="ml-4 list-disc">
        {day.events.map((event) => (
          <li key={event.id}>
            <p className=" font-medium text-gray-600">{event.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CalendarEvents() {
  return (
    <div className="p-3 font-abhaya">
      <CalendarEventsHeader />
      <div>
        <p>Brak podpiętego kalendarza</p>
      </div>
      <div className="mt-auto border-t-2 pt-2 text-center">
        <Button variant="light">Dodaj wydarzenie</Button>
      </div>
    </div>
  );
}
