import classNames from "classnames";
import { FC, useCallback } from "react";
import Image from "next/image";

interface Props {
  avatar?: string;
  nameInitial?: string;
  lightOnly?: boolean;
}

const conmmonClasses =
  "relative flex items-center justify-center rounded-full overflow-hidden w-8 h-8 select-none";

const ProfileIcon: FC<Props> = ({
  avatar,
  nameInitial,
  lightOnly,
}): JSX.Element => {
  const getStyle = useCallback(() => {
    return lightOnly
      ? "text-primary-dark bg-primary"
      : "dark:text-primary-dark text-primary bg-primary-dark dark:bg-primary";
  }, [lightOnly]);
  return (
    <div className={classNames(conmmonClasses, getStyle())}>
      {avatar ? (
        <Image src={avatar} layout="fill" alt="profile" />
      ) : (
        nameInitial
      )}
    </div>
  );
};

export default ProfileIcon;
