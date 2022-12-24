import { useEffect } from "react";

interface HeadProps {
  title: string;
}

export default function Head(props: HeadProps) {
  useEffect(() => {
    document.head.title = props.title;
  }, [props]);

  return <></>;
}
