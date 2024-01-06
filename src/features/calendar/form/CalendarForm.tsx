import { Input } from '@src/components/Input/Input';
import { Button } from '@src/components/button/Button';
import { useDeleleteCalendarEvent } from '@src/services/api/hooks/calendar';
import { CalendarEventType } from '@src/services/api/routes/projects';
import { useForm } from 'react-hook-form';

export type CalendarEventFields = Omit<CalendarEventType, 'id'>;

export function CalendarForm({
  event,
  onSubmit,
  onClose,
  pending,
}: {
  event?: CalendarEventType;
  onSubmit: (event: CalendarEventType) => void;
  onClose: () => void;
  pending?: boolean;
}) {
  const { handleSubmit, register } = useForm<CalendarEventFields>({
    defaultValues: event,
  });
  const { mutateAsync: mutateDeletion, isPending: isPendingDeletion } = useDeleleteCalendarEvent(event?.id);

  const submit = handleSubmit(onSubmit);

  return (
    <form onSubmit={submit}>
      <Input register={register} name="summary" labelText="Tytuł" validationSchema={{ required: true }} />
      <div className="grid-cols-2 gap-2 sm:grid">
        <Input
          register={register}
          name="start"
          type="datetime-local"
          labelText="Początek"
          validationSchema={{ required: true }}
        />
        <Input
          register={register}
          name="end"
          type="datetime-local"
          labelText="Koniec"
          validationSchema={{ required: true }}
        />
      </div>
      <Input
        register={register}
        name="description"
        labelText="Opis"
        type="textarea"
        rows={6}
        validationSchema={{ required: true }}
      />
      <Input register={register} name="location" labelText="Lokalizacja" validationSchema={{ required: true }} />
      <footer className="flex justify-between">
        {event ? (
          <Button
            isPending={isPendingDeletion}
            variant="danger"
            onClick={async () => {
              await mutateDeletion();
              onClose();
            }}
          >
            Usuń
          </Button>
        ) : (
          <div></div>
        )}
        <div className="flex gap-2">
          <Button onClick={onClose}>Anuluj</Button>
          <Button type="submit" variant="primary" isPending={pending}>
            {event ? 'Aktualizuj' : 'Dodaj'}
          </Button>
        </div>
      </footer>
    </form>
  );
}
