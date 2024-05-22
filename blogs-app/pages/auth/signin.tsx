import { GithubAuthButton } from "@/components/button";
import { NextPage } from "next";
import { signIn } from "next-auth/react";

interface Props {}

const Signin: NextPage<Props> = () => {
  const handleLoginWithGithub = async () => {
    await signIn("github", { callbackUrl: "/" });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-primary dark:bg-primary-dark">
      <GithubAuthButton onClick={handleLoginWithGithub} />
    </div>
  );
};

export default Signin;
