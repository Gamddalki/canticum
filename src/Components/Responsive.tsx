import React from "react";
import { useMediaQuery } from "react-responsive";

export const Mobile = ({ children }: { children: JSX.Element }) => {
  const isMobile = useMediaQuery({
    query: "(max-width:768px)",
  });
  return <>{isMobile && children}</>;
};

export const PC = ({ children }: { children: JSX.Element }) => {
  const isPC = useMediaQuery({
    query: "(min-width:769px)",
  });
  return <>{isPC && children}</>;
};
