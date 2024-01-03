import { useMutation, useQuery } from '@tanstack/react-query';
import { createCalendarEvent, deleteCalendarEvent, getCalendarEvents } from '../routes/projects';
import { queryClient } from '@src/App';
import { CalendarEventFields } from '@src/features/calendar/form/CalendarForm';

const EVENTS = 'EVENTS';
const EVENT = 'EVENT';

export function useGetCalendarEvents() {
  return useQuery({
    queryKey: [EVENTS],
    queryFn: async () => {
      const events = await getCalendarEvents();
      events.forEach((event) => queryClient.setQueryData([EVENT, event.id], event));

      return events;
    },
  });
}

export function useUpdateCalendarEvent() {}

export function useDeleleteCalendarEvent(id: number) {
  return useMutation({
    mutationFn: () => deleteCalendarEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [EVENTS] });
    },
  });
}

export function useCreateCalendarEvent() {
  return useMutation({
    mutationFn: (event: CalendarEventFields) => {
      return createCalendarEvent({ ...event, start: event.start + ':00', end: event.end + ':00' });
    },
    onSuccess: (res) => {
      queryClient.setQueryData([EVENT, res.data.id], res.data);
      queryClient.invalidateQueries({ queryKey: [EVENTS] });
    },
  });
}
