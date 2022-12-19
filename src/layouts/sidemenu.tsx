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

  const isActive =
    pathname === path
      ? "bg-primary/10 text-black border-r-4 border-r-primary"
      : "text-black";

  return (
    <Link to={path} onClick={() => setIsActive(false)}>
      <li className={"px-5 font-medium text-xl py-3 " + isActive}>{title}</li>
    </Link>
  );
}

export function SidemenuMobile({ isActive, setIsActive }: SidemenuProps) {
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
              className="fixed top-0 left-0 min-h-screen bg-white z-20 overflow-x-hidden rounded-r-lg"
            >
              <div className="w-full flex justify-center py-12">
                <Logo classMain="text-4xl" classPoint="text-4xl" />
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
      <SidemenuMobile isActive={isActive} setIsActive={setIsActive} />

      <main className="safe-zone pt-20">
        <Outlet />
      </main>
    </>
  );
}
