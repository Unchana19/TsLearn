import { FC, ReactNode, useState } from "react";

export type dropdownOption = {
  label: string;
  onClick(): void;
}[];

interface Props {
  option: dropdownOption;
  head: ReactNode;
}

const DropdownOption: FC<Props> = ({ head, option }): JSX.Element => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <button
      onBlur={() => setShowOptions(false)}
      onClick={() => setShowOptions(!showOptions)}
      className="relative"
    >
      {head}
      {showOptions && (
        <div className="min-w-max absolute top-full mt-4 right-0 z-40 border-2 border-primary-dark dark:border-primary rounded text-left bg-primary dark:bg-primary-dark">
          <ul className="p-3 space-y-3">
            {option.map(({ label, onClick }, index) => {
              return (
                <li
                  className="text-primary-dark dark:text-primary"
                  key={label + index}
                  onMouseDown={onClick}
                >
                  {label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </button>
  );
};

export default DropdownOption;
