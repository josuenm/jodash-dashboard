import { SetStateAction } from "react";
import { MdMenu } from "react-icons/md";

interface LogoProps {
  classMain?: string;
  classPoint?: string;
}

interface HeaderProps {
  isActive: boolean;
  setIsActive: React.Dispatch<SetStateAction<boolean>>;
}

export function Logo({ classMain, classPoint }: LogoProps) {
  return (
    <strong className={classMain}>
      Jodash<span className={"text-primary text-2xl " + classPoint}>.</span>
    </strong>
  );
}

export function Header({ isActive, setIsActive }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-10 bg-white/60 backdrop-blur-sm py-2 shadow-around-sm">
      <div className="safe-zone flex justify-between items-center ">
        <button onClick={() => setIsActive(!isActive)}>
          <MdMenu className="w-7 h-7" />
        </button>
        <Logo />
      </div>
    </header>
  );
}
