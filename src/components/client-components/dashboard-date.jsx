'use client';
import { useState, useEffect } from 'react';

export default function DashboardDate() {
  const [currentTime, setCurrentTime] = useState(null);

  useEffect(() => {
    setCurrentTime(new Date());
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!currentTime) {
    return (
      <div className="flex items-center gap-4">
        <div className="h-7 w-64 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  const currentDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return (
    <div className="flex items-center gap-4">
      <h2 className="text-md font-semibold ">
        {currentDate}
      </h2>
      <h2 className="text-md font-semibold ">
        {formattedTime}
      </h2>
    </div>
  );
}