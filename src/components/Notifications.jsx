import { AnimatePresence, motion } from "framer-motion";

const Notifications = ({ notifications }) => {
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