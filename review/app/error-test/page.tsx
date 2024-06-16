import ErrorGenerate from "@/components/ErrorGenerate";
import { NextPage } from "next";

interface Props {}

const ErrorPage: NextPage<Props> = () => {
  return (
    <div>
      This page is going to show us next js error
      <ErrorGenerate />
    </div>
  );
};

export default ErrorPage;
