import { useEffect } from "react";

interface HeadProps {
  title: string;
}

export default function Head({ title }: HeadProps) {
  useEffect(() => {
    document.head.title = title ? `${title} - Jodash` : "Jodash";
  }, []);

  return <></>;
}
