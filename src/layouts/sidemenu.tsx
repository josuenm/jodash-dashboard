import { useAccess } from "@/contexts/accessContext";
import { AnimatePresence, motion } from "framer-motion";
import { SetStateAction, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Header, Logo } from "../components/header";

interface OptionProps {
  title: string;
  path: string;
}

interface SidebarProps extends OptionProps {
  setIsActive: React.Dispatch<SetStateAction<boolean>>;
}

interface SidemenuProps {
  isActive: boolean;
  setIsActive: React.Dispatch<SetStateAction<boolean>>;
}

const sidemenuOptions: OptionProps[] = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Customers",
    path: "/customers",
  },
  {
    title: "Products",
    path: "/products",
  },
];

export function Background({ onClick }: { onClick: () => void }) {
  return (
    <div
      className="fixed top-0 left-0 w-full min-h-screen bg-black/20 z-10"
      onClick={onClick}
    />
  );
}

export function SidebarOption({ title, path, setIsActive }: SidebarProps) {
  const { pathname } = useLocation();

  const pathFormatted = pathname.split("/");
  pathFormatted.shift();

  const isActive = pathFormatted.some((item) => `/${item}` === path)
    ? "bg-primary/10 text-black border-r-4 border-r-primary"
    : "text-black";

  return (
    <Link to={path} onClick={() => setIsActive(false)}>
      <li
        className={
          "duration-300 px-5 font-medium text-xl md:text-base py-3 hover:opacity-50 " +
          isActive
        }
      >
        {title}
      </li>
    </Link>
  );
}

export function AsideMenu({ isActive, setIsActive }: SidemenuProps) {
  const { signOut } = useAccess();

  return (
    <>
      {isActive && <Background onClick={() => setIsActive(false)} />}

      <AnimatePresence>
        {isActive && (
          <>
            <motion.aside
              initial={{ width: 0 }}
              animate={{ width: "17rem" }}
              exit={{ width: 0 }}
              className="fixed top-0 left-0 min-h-screen bg-white z-20 overflow-x-hidden rounded-r-lg flex flex-col justify-between"
            >
              <header>
                <div className="w-full flex justify-center py-12">
                  <Logo
                    classMain="text-4xl md:text-2xl"
                    classPoint="text-4xl"
                  />
                </div>

                <ul>
                  {sidemenuOptions.map((item, index) => (
                    <SidebarOption
                      {...item}
                      key={index}
                      setIsActive={setIsActive}
                    />
                  ))}
                </ul>
              </header>
              <footer className="px-5 py-8 flex justify-center">
                <button
                  className="px-8 py-2 duration-300 bg-primary/20 hover:bg-primary/40 font-bold rounded-md text-primary md:text-base"
                  onClick={signOut}
                >
                  Sign out
                </button>
              </footer>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function Sidemenu() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <Header isActive={isActive} setIsActive={setIsActive} />
      <AsideMenu isActive={isActive} setIsActive={setIsActive} />

      <main className="safe-zone my-20 bg-white rounded-lg p-5">
        <Outlet />
      </main>
    </>
  );
}
