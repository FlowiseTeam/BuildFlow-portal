import { createContext, useContext, useState } from 'react';
import { NotificationType, Notification } from './Notifications';
import { concat } from 'lodash';

interface NotificationContextValue {
  push: (message: string, type: NotificationType) => void;
  remove: (id: number) => void;
  notifications: Notification[];
}

const NotificationContext = createContext<null | NotificationContextValue>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [timeoutsQueue, setTimeoutsQueue] = useState<{ timeoutId: NodeJS.Timeout; notificationId: number }[]>([]);
  const [nextNotificationId, setNextNotificationId] = useState(0);

  const push = (message: string, type: NotificationType) => {
    const notification: Notification = { message, type, id: nextNotificationId };
    setNotifications((prev) => [...prev, notification]);
    const timeoutId = setTimeout(() => {
      remove(nextNotificationId);
    }, 5000);
    setTimeoutsQueue((prev) => concat(prev, { timeoutId, notificationId: nextNotificationId }));
    setNextNotificationId((prev) => prev + 1);
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
    <NotificationContext.Provider value={{ notifications, push, remove }}>{children}</NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotifications must be used within the NotificationProvider.');
  }

  return context;
}
