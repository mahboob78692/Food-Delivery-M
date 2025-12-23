
'use client';

import { useState, useEffect } from 'react';

export function EstimatedDeliveryTime({ orderDate }: { orderDate: string }) {
  const [deliveryTime, setDeliveryTime] = useState('');

  useEffect(() => {
    const calculateDeliveryTime = () => {
      const date = new Date(orderDate);
      date.setMinutes(date.getMinutes() + 30); // Assuming 30 min delivery
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    setDeliveryTime(calculateDeliveryTime());
  }, [orderDate]);

  return <span>{deliveryTime || 'Calculating...'}</span>;
}
