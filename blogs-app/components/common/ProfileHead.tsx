import classNames from "classnames";
import Image from "next/image";
import { FC, useCallback } from "react";
import { AiFillCaretDown } from "react-icons/ai";

interface Props {
  lightOnly?: boolean;
  avatar?: string;
  nameInitial?: string;
}

const conmmonClasses =
  "relative flex items-center justify-center rounded-full overflow-hidden w-8 h-8 select-none";

const ProfileHead: FC<Props> = ({
  lightOnly,
  avatar,
  nameInitial,
}): JSX.Element => {
  const getStyle = useCallback(() => {
    return lightOnly
      ? "text-primary-dark bg-primary"
      : "dark:text-primary-dark text-primary bg-primary-dark dark:bg-primary";
  }, [lightOnly]);
  return (
    <div className="flex items-center">
      {/* image / name initial */}
      <div className={classNames(conmmonClasses, getStyle())}>
        {avatar ? (
          <Image src={avatar} layout="fill" alt="profile" />
        ) : (
          nameInitial
        )}
      </div>

      {/* down icon */}
      <AiFillCaretDown
        className={
          lightOnly ? "text-primary" : "text-primary-dark dark:text-primary"
        }
      />
    </div>
  );
};

export default ProfileHead;
