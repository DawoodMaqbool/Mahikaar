import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/** The 1440px centred content column used by every section of the site. */
export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`w-full max-w-[1440px] mx-auto px-6 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}
