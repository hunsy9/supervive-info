import { ReactNode } from "react";
import logo from "../assets/supervive_logo.png"

export function BasicLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header className={"h-[70px] mb-[70px]"}>
          <div>
              {/*<img src={"../../assets/supervive_logo.png"}/>*/}
              <img src={logo} className={"w-[180px]"}/>
          </div>
      </header>
      <div className={"pl-[200px] pr-[200px]"}>{children}</div>
    </div>
  );
}
