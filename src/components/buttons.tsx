interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: string;
  className?: string;
}

const defaultStyle = "duration-300 font-medium rounded-md w-full px-5 py-1";

export function NormalButton({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`bg-primary text-white active:hover:opacity-70 md:hover:opacity-70 ${defaultStyle} ${className}`}
    >
      {children}
    </button>
  );
}

export function OutlineButton({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`text-primary active:hover:bg-primary/20 md:hover:bg-primary/20 ${defaultStyle} ${className}`}
    >
      {children}
    </button>
  );
}
