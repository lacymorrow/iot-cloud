import { ReactNode } from "react";
import { Inter as FontSans } from "next/font/google";

import Meta from "@/components/Meta";
import config from "@/utils/config";
import { cn } from "@/lib/utils";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = (props: MainLayoutProps) => {
  return (
    <>
      <Meta
        title={`${config.title}: ${config.tagline}`}
        description={config.description}
      />
      <div
        className={cn(
          "bg-background font-sans antialiased",
          "h-[320px] w-[480px] border-solid border-2 border-black p-2 relative",
          fontSans.variable
        )}
      >
        {props.children}
      </div>
    </>
  );
};

export default MainLayout;
