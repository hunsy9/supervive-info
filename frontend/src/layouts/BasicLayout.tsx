import { ReactNode } from "react";
import logo from "../assets/supervive_logo.png"

export function BasicLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header className={"h-[70px] mb-[70px]"}>
          <div>
              <img src={logo} className={"ml-11 mt-2 w-[150px]"}/>
          </div>
      </header>
      <div className={"pl-[200px] pr-[200px]"}>{children}</div>
    </div>
  );
}
