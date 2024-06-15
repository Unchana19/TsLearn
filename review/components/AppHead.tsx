import { FC } from "react";

interface Props {
  title?: string;
  desc?: string;
}

export const APP_NAME = "Review App";
const defaultDesc =
  "A place from where you will get the authentic review for all kind of products";

const AppHead: FC<Props> = ({ title, desc }): JSX.Element => {
  const appTitle = title ? `${title} | ${APP_NAME}` : APP_NAME;
  return (
    <>
      <title>{appTitle}</title>
      <meta content="width=device-width,initial-scale=1" name="viewport" />
      <meta content={desc || defaultDesc} name="description" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
};

export default AppHead;
