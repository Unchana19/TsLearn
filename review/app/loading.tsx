import { FC } from "react";

interface Props {}

const Loading: FC<Props> = (props): JSX.Element => {
  return (
    <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 max-w-4xl">
      {Array(4)
        .fill("")
        .map((_, index) => {
          return (
            <div className="space-y-2" key={index}>
              <div className="h-28 bg-gray-900"></div>
              <div className="h-4 bg-gray-900"></div>
              <div className="h-4 bg-gray-900"></div>
            </div>
          );
        })}
    </div>
  );
};

export default Loading;
