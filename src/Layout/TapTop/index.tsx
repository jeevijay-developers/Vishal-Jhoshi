import { useEffect, useState } from "react";

const TapTop = () => {
  const [tapTopStyle, setTapTopStyle] = useState("none");
  
  const executeScroll = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > 100) setTapTopStyle("block");
      else setTapTopStyle("none");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="tap-top" style={{ display: tapTopStyle }} onClick={executeScroll}>
      <i className="iconly-Arrow-Up icli" />
    </div>
  );
};

export default TapTop;
