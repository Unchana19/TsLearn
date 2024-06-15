"use client";

import { FC, ReactNode, useEffect } from "react";
import { APP_NAME } from "./AppHead";

interface Props {
  subCategory: string;
  children: ReactNode;
}

const HeadClient: FC<Props> = ({ subCategory, children }): JSX.Element => {
  useEffect(() => {
    document.title = `${subCategory} | ${APP_NAME}`;
  }, []);

  return <>{children}</>;
};

export default HeadClient;
