import { useEffect, useState } from "react";
import "../assets/css/timerV1.css"; // Import the CSS for styling

const TimerV1 = ({ endTime, className }) => {
  // Parse the ISO 8601 endTime string to get the timestamp in milliseconds
  const endTimestamp = new Date(endTime).getTime();

  // Calculate the remaining time in seconds from the current time to the end time
  const calculateRemainingTime = () => {
    const now = Date.now();
    const remainingTime = Math.floor((endTimestamp - now) / 1000); // Convert milliseconds to seconds
    return remainingTime > 0 ? remainingTime : 0;
  };

  // Define state for the timer
  const [time, setTime] = useState(calculateRemainingTime());

  // Effect to handle the countdown
  useEffect(() => {
    if (time <= 0) return; // Stop if time is zero or less

    const intervalId = setInterval(() => {
      setTime(calculateRemainingTime());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [time, endTimestamp]);

  // Function to format the time in HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  return <div className={`timerV1 ${className}`}>{formatTime(time)}</div>;
};

export default TimerV1;
