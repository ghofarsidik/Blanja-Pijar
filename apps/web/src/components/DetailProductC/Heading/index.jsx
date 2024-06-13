import React from "react";

const sizes = {
  xl: "text-[34px] font-bold md:text-[32px] sm:text-3xl",
  s: "text-xl font-semibold",
  md: "text-[28px] font-semibold md:text-[26px] sm:text-2xl",
  xs: "text-base font-semibold",
  lg: "text-[33px] font-bold md:text-[31px] sm:text-[29px]",
};

const Heading = ({ children, className = "", size = "md", as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component className={`text-[#222222] font-['Metropolis'] ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
