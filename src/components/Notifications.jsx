import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Notifications = () => {

  const NOTIFICATION_TIMEOUT = 3000;
  const hasRun = useRef(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!hasRun.current) {
      createNotification('Welcome to the shopping app!')
      hasRun.current = true;
    }
  }, [])

  const createNotification = (message) => {
    const id = crypto.randomUUID();
    const notification = { id, message };
    setNotifications(prev => [...prev, notification]);

    setTimeout(() => {
      setNotifications((prev) =>
        prev.filter((item) => item.id !== id)
      );
    }, NOTIFICATION_TIMEOUT);
  }

  return (
    <div className="notifications-container">
      <AnimatePresence>
        {notifications.map(notification => (
          <motion.div key={notification.id}
            initial={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{ opacity: 0, translateY: -10 }}
            transition={{ duration: 1 }}
            className="notification">
            {notification.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default Notifications;