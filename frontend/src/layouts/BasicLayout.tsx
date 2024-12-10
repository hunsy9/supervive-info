import { ReactNode } from "react";

export function BasicLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header className={"h-[70px] mb-[30px]"} />
      <div className={"pl-[200px] pr-[200px]"}>{children}</div>
    </div>
  );
}
