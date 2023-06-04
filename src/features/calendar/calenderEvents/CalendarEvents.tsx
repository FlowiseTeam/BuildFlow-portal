import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { Button } from '@src/components/button/Button';

const events = [
  {
    date: 'Dziś',
    events: ['Przedstawienie BDO', 'Przedstawienie BDO'],
  },
  {
    date: 'Jutro',
    events: ['Przedstawienie BDO', 'Przedstawienie BDO'],
  },
  {
    date: '14 kwietnia',
    events: ['Przedstawienie BDO', 'Przedstawienie BDO'],
  },
];

export function CalendarEvents() {
  return (
    <div className="p-3 font-abhaya">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm uppercase tracking-widest text-gray-600">Terminy</p>
        <CalendarDaysIcon className="h-6 text-primary" />
      </div>
      <div>
        {events.map((day) => (
          <div className="mb-6" key={day.date}>
            <p className="mb-1 text-xl font-medium text-primary">{day.date}</p>
            <ul className="list-disc">
              {day.events.map((event) => (
                <li key={Math.random()}>
                  <p className=" font-medium text-gray-600">{event}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-auto border-t-2 pt-2 text-center">
        <Button variant="light">Dodaj wydarzenie</Button>
      </div>
    </div>
  );
}
