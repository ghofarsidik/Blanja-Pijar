import React from "react";

const sizes = {
  xs: "text-xs font-medium",
  lg: "text-xl font-medium",
  s: "text-sm font-medium",
  xl: "text-6xl font-medium md:text-[52px] sm:text-[46px]",
  md: "text-base font-medium",
};

const Text = ({ children, className = "", as, size = "md", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`text-[#9b9b9b] font-['Metropolis'] ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
