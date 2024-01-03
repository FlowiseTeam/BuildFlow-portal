import { Modal } from '@src/components/modal/Modal';
import { CalendarEventType } from '@src/services/api/routes/projects';
import { CalendarEventFields, CalendarForm } from '../form/CalendarForm';

interface CalendarEventModalProps {
  event: CalendarEventType | null;
  onClose: () => void;
  isOpen: boolean;
  onSubmit: (event?: CalendarEventFields | CalendarEventType) => void;
  pendingCreation?: boolean;
}

export function CalendarEventModal({ event, onClose, isOpen, onSubmit, pendingCreation }: CalendarEventModalProps) {
  return (
    <Modal onClose={onClose} show={isOpen}>
      <CalendarForm event={event} onSubmit={onSubmit} onClose={onClose} pendingCreation={pendingCreation} />
    </Modal>
  );
}
