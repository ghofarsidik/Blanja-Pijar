import React from "react";

export const useResponsive = () => {
  const [mobile, setMobile] = React.useState(false);
  React.useEffect(() => {
    const mobile = window.matchMedia("(max-width: 800px)");
    const handleResize = () => {
      if (mobile.matches === true) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return mobile;
};
