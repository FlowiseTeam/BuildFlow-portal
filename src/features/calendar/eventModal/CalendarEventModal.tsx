import { Modal } from '@src/components/modal/Modal';
import { CalendarEventType } from '@src/services/api/routes/projects';
import { CalendarEventFields, CalendarForm } from '../form/CalendarForm';

interface CalendarEventModalProps {
  event: CalendarEventType | null;
  onClose: () => void;
  isOpen: boolean;
  onSubmit: (event?: CalendarEventFields | CalendarEventType) => void;
  pending?: boolean;
}

export function CalendarEventModal({ event, onClose, isOpen, onSubmit, pending }: CalendarEventModalProps) {
  return (
    <Modal onClose={onClose} show={isOpen}>
      <CalendarForm event={event} onSubmit={onSubmit} onClose={onClose} pending={pending} />
    </Modal>
  );
}
