import { FC, MouseEventHandler, ReactNode } from "react";
import { BiArrowFromLeft, BiArrowFromRight } from "react-icons/bi";

interface Props {
  onPrevClick?(): void;
  onNextClick?(): void;
}

const PageNavigator: FC<Props> = ({
  onPrevClick,
  onNextClick,
}): JSX.Element => {
  return (
    <div className="flex items-center space-x-3">
      <Button onClick={onPrevClick} title={<BiArrowFromRight size={24} />} />
      <Button onClick={onNextClick} title={<BiArrowFromLeft size={24} />} />
    </div>
  );
};

const Button: FC<{ title: ReactNode; onClick?: MouseEventHandler }> = ({
  title,
  onClick,
}) => {
  return (
    <button
      className="text-primary-dark dark:text-primary hover:underline transition"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default PageNavigator;
