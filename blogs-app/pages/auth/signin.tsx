import { GithubAuthButton } from "@/components/button";
import { NextPage } from "next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

interface Props {}

const Signin: NextPage<Props> = () => {
  const router = useRouter();

  const handleLoginWithGithub = async () => {
    await signIn("github").then(() => {
      router.push("/");
    });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-primary dark:bg-primary-dark">
      <GithubAuthButton onClick={handleLoginWithGithub} />
    </div>
  );
};

export default Signin;
