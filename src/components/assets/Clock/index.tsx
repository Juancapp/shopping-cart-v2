import { useEffect, useState } from "react";

function Clock({ minutes }: { minutes: number }) {
  const [boolean, setBoolean] = useState(true);

  useEffect(() => {
    const secondId = setInterval(() => {
      setBoolean((prevValue) => !prevValue);
    }, 1000);

    return () => clearInterval(secondId);
  }, [boolean]);

  return (
    <div className="absolute flex left-14">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 text-gray-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
      <p className="text-gray-800 text-[12px] translate-y-[-6px]">
        {minutes}
        {boolean && "'"}
      </p>
    </div>
  );
}

export default Clock;
