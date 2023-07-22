import { XCircleIcon } from '@heroicons/react/20/solid';
import { useNotifications } from './NotificationProvider';

export function Notifications() {
  const { notifications, remove } = useNotifications();

  return (
    <div className="fixed right-0 top-0 z-50 mr-4 mt-4 flex flex-col gap-2">
      {notifications.map((notification) => (
        <Notification notification={notification} remove={remove} key={notification.id} />
      ))}
    </div>
  );
}

export type NotificationType = 'error' | 'pending' | 'success';

export interface Notification {
  message: string;
  id: number;
  type: NotificationType;
}

const typeTranslation: { [key in NotificationType]: string } = {
  error: 'Błąd',
  pending: 'W trakcie',
  success: 'Sukces',
};

const headingColor: { [key in NotificationType]: string } = {
  error: 'text-red-600',
  pending: '',
  success: 'text-green-700',
};

function Notification({
  notification: { id, message, type },
  remove,
}: {
  notification: Notification;
  remove: (id: number) => void;
}) {
  return (
    <div className="relative min-h-[4rem] w-64 animate-notification-enter rounded-md border-[1px] border-stone-200 bg-stone-100 px-4 py-1 text-sm shadow-lg [&>*]:hover:flex">
      <div className="absolute -left-2 -top-2 hidden items-center justify-center hover:cursor-pointer ">
        <div className=" absolute h-3 w-3 bg-white"></div>
        <XCircleIcon className="z-10 h-5 text-neutral-300" onClick={() => remove(id)} />
      </div>
      <p className={`text-xs font-semibold ${headingColor[type]}`}>{typeTranslation[type]}</p>
      {message}
    </div>
  );
}
