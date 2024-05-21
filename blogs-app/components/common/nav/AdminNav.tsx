import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { RiMenuFold4Fill, RiMenuUnfold4Fill } from "react-icons/ri";
import Logo from "../Logo";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

interface Props {
  navItems: { label: string; icon: IconType; href: string }[];
}

const NAV_OPEN_WIDTH = "w-60";
const NAV_CLOSE_WIDTH = "w-12";
const NAV_VISIBILITY = "nav-visibility";

const AdminNav: FC<Props> = ({ navItems }): JSX.Element => {
  const navRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState<boolean>(true);

  const toggleNav = (visibility: boolean) => {
    const { current: currentNav } = navRef;
    if (!currentNav) return;

    const { classList } = currentNav;
    if (visibility) {
      // hide nav
      classList.remove(NAV_OPEN_WIDTH);
      classList.add(NAV_CLOSE_WIDTH);
    } else {
      // show nav
      classList.add(NAV_OPEN_WIDTH);
      classList.remove(NAV_CLOSE_WIDTH);
    }
    setVisible(!visibility);
  };

  const updateNavState = () => {
    toggleNav(visible);
    const newState = !visible;
    setVisible(newState);
    localStorage.setItem(NAV_VISIBILITY, JSON.stringify(newState));
  };

  useEffect(() => {
    const navState = localStorage.getItem(NAV_VISIBILITY);

    if (navState !== null) {
      const newState = JSON.parse(navState);
      setVisible(newState);
      toggleNav(!newState);
    } else {
      setVisible(true);
    }
  }, []);

  return (
    <nav
      ref={navRef}
      className="h-screen w-60 shadow-sm bg-secondary-light dark:bg-secondary-dark flex flex-col justify-between transition-width overflow-hidden sticky top-0"
    >
      <div>
        {/* Logo */}
        <Link href="/admin" className="flex items-center space-x-2 p-3 mb-5">
          <Logo className="fill-highlight-light dark:fill-highlight-dark w-5 h-5" />
          {visible && (
            <span className="text-primary-dark dark:text-primary text-xl font-semibold leading-none">
              Admin
            </span>
          )}
        </Link>

        {/* NavItem */}
        <div className="space-y-4">
          {navItems.map(
            (item: { label: string; icon: IconType; href: string }) => {
              return (
                <Tippy key={item.href} content={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center  text-xl p-3 hover:scale-[0.98] transition"
                  >
                    <item.icon
                      className="fill-highlight-light dark:fill-highlight-dark"
                      size={24}
                    />
                    {visible && (
                      <span className="ml-2 leading-none text-primary-dark dark:text-primary">
                        {item.label}
                      </span>
                    )}
                  </Link>
                </Tippy>
              );
            }
          )}
        </div>
      </div>

      {/* Nav Toggle Button */}
      <button
        onClick={updateNavState}
        className=" p-3 hover:scale-[0.98] transition self-end"
      >
        {visible ? (
          <RiMenuUnfold4Fill
            className="fill-highlight-light dark:fill-highlight-dark"
            size={25}
          />
        ) : (
          <RiMenuFold4Fill
            className="fill-highlight-light dark:fill-highlight-dark"
            size={25}
          />
        )}
      </button>
    </nav>
  );
};

export default AdminNav;
