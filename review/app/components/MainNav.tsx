import Link from "next/link";
import { FC } from "react";
import Logo from "./Logo";
import navItems from "@/utils/nav-items";

interface Props {}

const MainNav: FC<Props> = (props): JSX.Element => {
  return (
    <div className="bg-gray-900 fixed top-0 left-0 bottom-0 w-44 p-5">
      <Link href="/" className="block mb-10">
        <Logo />
      </Link>

      {/* nav items */}
      <div className="space-y-5">
        {navItems.map((item) => {
          return (
            <Link className="block" href={item.slug}>
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MainNav;
