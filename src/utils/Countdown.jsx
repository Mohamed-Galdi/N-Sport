import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// NOTE: Change this date to whatever date you want to countdown to :)

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const Countdown = ({ matchDate }) => {
  const intervalRef = useRef(null);

  const [remaining, setRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    intervalRef.current = setInterval(handleCountdown, 1000);

    return () => clearInterval(intervalRef.current || undefined);
  }, []);

  const handleCountdown = () => {
    const end = new Date(matchDate);

    const now = new Date();

    const distance = +end - +now;

    const days = Math.floor(distance / DAY);
    const hours = Math.floor((distance % DAY) / HOUR);
    const minutes = Math.floor((distance % HOUR) / MINUTE);
    const seconds = Math.floor((distance % MINUTE) / SECOND);

    setRemaining({
      days,
      hours,
      minutes,
      seconds,
    });
  };

  return (
    <div>
      <div className="md:flex hidden gap-2 text-sm md:text-base justify-between items-center border-ns_primary border-2 rounded-lg px-3">
        <CountdownItem num={remaining.days} text="days" />
        <CountdownItem num={remaining.hours} text="hours" />
        <CountdownItem num={remaining.minutes} text="minutes" />
        <CountdownItem num={remaining.seconds} text="seconds" />
      </div>
      <div className="md:hidden flex gap-2 text-sm md:text-base justify-between items-center border-ns_primary border-2 rounded-lg px-1">
        <CountdownItem num={remaining.days} text="d" />
        <CountdownItem num={remaining.hours} text="h" />
        <CountdownItem num={remaining.minutes} text="m" />
        <CountdownItem num={remaining.seconds} text="s" />
      </div>
    </div>
  );
};

const CountdownItem = ({ num, text }) => {
  return (
    <div>
      <div className="w-full text-center relative overflow-hidden flex ">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={num}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ ease: "backIn", duration: 0.75 }}
            className="block  text-black "
          >
            {num}
          </motion.span>
          <span className="text-ns_primary ms-1">{text} </span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Countdown;
