import { createContext, useContext, useState } from 'react';
import { NotificationType, Notification, Notifications } from './Notifications';
import { concat } from 'lodash';

interface NotificationContextValue {
  notify: (message: string, type: NotificationType) => number;
  remove: (id: number) => void;
  notifications: Notification[];
}

const NotificationContext = createContext<null | NotificationContextValue>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [timeoutsQueue, setTimeoutsQueue] = useState<{ timeoutId: NodeJS.Timeout; notificationId: number }[]>([]);
  const [nextNotificationId, setNextNotificationId] = useState(0);

  const notify = (message: string, type: NotificationType) => {
    const id = nextNotificationId;
    const notification: Notification = { message, type, id };
    setNotifications((prev) => concat(prev, notification));
    const timeoutId = setTimeout(() => {
      remove(id);
    }, 5000);
    setTimeoutsQueue((prev) => concat(prev, { timeoutId, notificationId: id }));
    setNextNotificationId((prev) => prev + 1);
    return id;
  };

  const remove = (id: number) => {
    setTimeoutsQueue((prev) => {
      const timeoutInfoIndex = prev.findIndex((item) => item.notificationId === id); //must be inside the setter fn
      clearTimeout(timeoutsQueue[timeoutInfoIndex]?.timeoutId);
      return prev.filter((item) => item.notificationId === id);
    });
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, notify, remove }}>
      <>
        <Notifications />
        {children}
      </>
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotifications must be used within the NotificationProvider.');
  }

  return context;
}
