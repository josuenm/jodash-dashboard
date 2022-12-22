import { SignInProps } from "@/@types/userType";
import { NormalButton, OutlineButton } from "@/components/buttons";
import { Logo } from "@/components/header";
import { useAccess } from "@/contexts/accessContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInProps>({
    resolver: yupResolver(schema),
  });

  const { signIn } = useAccess();

  const onSubmit = (data: SignInProps) => signIn(data);

  const passwordRef = useRef<HTMLDivElement>(null);

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (passwordRef.current && !passwordRef.current.contains(event.target)) {
        passwordRef.current?.classList.remove("border-primary");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [passwordRef]);

  return (
    <main className="w-full min-h-screen flex justify-center items-center">
      <form
        className="w-full max-w-xs md:max-w-sm bg-white rounded-lg p-5 md:py-8 md:px-10 flex flex-col gap-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <header className="flex justify-center">
          <Logo classMain="text-2xl" classPoint="text-2xl" />
        </header>

        <div className="flex flex-col gap-3">
          <FormGroup>
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Type your address"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            )}
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Password:</label>

            <div
              className="relative form-input overflow-hidden"
              ref={passwordRef}
            >
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="outline-none"
                placeholder="Type your password"
                onFocus={() =>
                  passwordRef.current?.classList.add("border-primary")
                }
                {...register("password")}
              />

              <div
                className="absolute bottom-2/4 translate-y-2/4 right-0 px-3 text-lg text-primary shadow h-full flex justify-center items-center cursor-pointer"
                onClick={togglePassword}
              >
                {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            )}
          </FormGroup>
        </div>

        <footer className="flex flex-col gap-2">
          <NormalButton type="submit">Sign In</NormalButton>
          <OutlineButton>I don't have an account</OutlineButton>
        </footer>
      </form>
    </main>
  );
}

function FormGroup({ children }: { children?: ReactNode | ReactNode[] }) {
  return <div className="flex flex-col gap-1">{children}</div>;
}
