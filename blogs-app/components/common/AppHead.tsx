import Head from "next/head";
import { FC } from "react";

interface Props {
  title?: string;
  desc?: string;
}

export const APP_NAME = "Blog App";

const AppHead: FC<Props> = ({ title, desc }): JSX.Element => {
  return (
    <Head>
      <title>{title ? title + " | " + APP_NAME : APP_NAME}</title>
      <meta content={desc} name="description" />
    </Head>
  );
};

export default AppHead;
