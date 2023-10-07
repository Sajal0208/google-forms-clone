import React from "react";

interface Props {
  children: React.ReactNode;
  className: string;
  customStyle?: React.CSSProperties;
}

const Wrapper = ({ children, className, customStyle }: Props) => {
  return <div className={className} style = {customStyle}>
    {children}
  </div>;
};

export default Wrapper;
