import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();
export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Initial check for bills
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Mock bills
    const bills = [
      { service: 'MongoDB', dueDate: tomorrow, amount: '$49.99' },
      { service: 'Llama API', dueDate: new Date(today.getFullYear(), today.getMonth() + 1, 15), amount: '$99.00' }
    ];

    bills.forEach(bill => {
      // Check if due tomorrow
      if (
        bill.dueDate.getDate() === tomorrow.getDate() &&
        bill.dueDate.getMonth() === tomorrow.getMonth() &&
        bill.dueDate.getFullYear() === tomorrow.getFullYear()
      ) {
        addNotification({
          id: Date.now() + Math.random(),
          title: 'Bill Due Tomorrow',
          message: `${bill.service} bill of ${bill.amount} is due.`,
          type: 'warning',
          date: new Date().toISOString()
        });
      }
    });
  }, []);

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => setNotifications([]);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clearAll }}>
      {children}
    </NotificationContext.Provider>
  );
};
