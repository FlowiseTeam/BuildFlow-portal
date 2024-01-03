import { CalendarDaysIcon } from '@heroicons/react/24/outline';
import { Button } from '@src/components/button/Button';
import { LoadingSpace } from '@src/components/loadings/Loading';
import { strategy } from '@src/lib/strategy';
import { useCreateCalendarEvent, useGetCalendarEvents } from '@src/services/api/hooks/calendar';
import { CalendarEventType } from '@src/services/api/routes/projects';
import { useState } from 'react';
import { CalendarEventModal } from './eventModal/CalendarEventModal';
import { CalendarEvent } from './event/CalendarEvent';
import { useToggle } from '@src/hooks/useToggle';

export function CalendarEventsHeader() {
  return (
    <div className="mb-6 flex items-center justify-between">
      <p className="text-sm uppercase tracking-widest text-gray-600">Terminy</p>
      <CalendarDaysIcon className="h-6 text-primary" />
    </div>
  );
}

function CalendarEventsList({ events }: { events: CalendarEventType[] }) {
  if (!events.length) {
    return <p className="text-center">Brak wydarzeń.</p>;
  }
  const [selectedEvent, setSelectedEvent] = useState<null | CalendarEventType>(null);

  const handleEventClick = (event: CalendarEventType) => setSelectedEvent(event);

  const handleCloseModal = () => setSelectedEvent(null);

  return (
    <>
      <CalendarEventModal event={selectedEvent} onClose={handleCloseModal} isOpen={!!selectedEvent} />
      <ul className="flex flex-col gap-1 font-sans">
        {events.map((event) => (
          <CalendarEvent event={event} key={event.id} handleEventClick={handleEventClick} />
        ))}
      </ul>
    </>
  );
}

export function CalendarEvents() {
  const { data, isLoading, isError, isRefetching } = useGetCalendarEvents();
  const [isOpen, toggle] = useToggle();
  const { mutateAsync, isPending } = useCreateCalendarEvent();

  return (
    <div className="p-3 font-abhaya">
      <CalendarEventModal
        onClose={toggle}
        isOpen={!!isOpen}
        onSubmit={async (e) => {
          await mutateAsync(e);
          toggle();
        }}
        pendingCreation={isPending}
      />
      <CalendarEventsHeader />
      {strategy(
        { data, isLoading: isLoading || isRefetching, isError },
        {
          loading: <LoadingSpace />,
          error: <p className="text-center text-red-600">Wystąpił błąd.</p>,
          exists: (events) => (
            <>
              <CalendarEventsList events={events} />
              <div className="mt-2 text-center">
                <Button variant="light" onClick={toggle}>
                  Dodaj wydarzenie
                </Button>
              </div>
            </>
          ),
        },
      )}
    </div>
  );
}
