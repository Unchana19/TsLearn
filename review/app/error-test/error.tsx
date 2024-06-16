"use client";
import { FC } from "react";

interface Props {
  error: Error;
  reset(): void;
}

const error: FC<Props> = ({ error, reset }): JSX.Element => {
  return (
    <div className="text-red-400">
      {error.message}
      <button onClick={reset} className="text-white hover:underline">
        Retry...
      </button>
    </div>
  );
};

export default error;
