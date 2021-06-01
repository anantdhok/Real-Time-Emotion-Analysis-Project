import { useState, useEffect } from "react";

export default function Time() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    var timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  return time;
}
