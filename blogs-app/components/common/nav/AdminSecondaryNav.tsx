import { FC } from "react";
import DropdownOption, { dropdownOption } from "../DropdownOption";
import ProfileHead from "../ProfileHead";
import { useRouter } from "next/router";
import useDarkMode from "@/hooks/useDarkMode";
import { signOut } from "next-auth/react";
import SearchBar from "../SearchBar";

interface Props {}

const AdminSecondaryNav: FC<Props> = (props): JSX.Element => {
  const router = useRouter();
  const navigateToCreateNewPost = () => {
    router.push("/admin/posts/create");
  };
  const { toggleTheme } = useDarkMode();

  const handdleLogOut = async () => {
    await signOut();
  };

  const options: dropdownOption = [
    {
      label: "Add new post",
      onClick: navigateToCreateNewPost,
    },
    {
      label: "Change theme",
      onClick: toggleTheme,
    },
    {
      label: "Log out",
      onClick: handdleLogOut,
    },
  ];

  return (
    <div className="flex items-center justify-between">
      {/* search bar */}
      <SearchBar />

      {/* options / profile head */}
      <DropdownOption head={<ProfileHead nameInitial="O" />} option={options} />
    </div>
  );
};

export default AdminSecondaryNav;
