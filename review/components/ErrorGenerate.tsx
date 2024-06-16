"use client";

import { FC, useState } from "react";

interface Props {}

const ErrorGenerate: FC<Props> = (props): JSX.Element => {
  const [isError, setIsError] = useState<boolean>(false);

  if (isError) throw new Error("Ops, my custom error!");

  return (
    <button
      onClick={() => setIsError(true)}
      className="p-2 bg-red-500 text-white"
    >
      ErrorGenerate
    </button>
  );
};

export default ErrorGenerate;
