import React, { useState, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";

const ToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Clean up function
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <Link smooth to={"/#"}>
          <button className="btn btn-secondary position-fixed bottom-0 end-0 m-3 opacity-50">To Top</button>
        </Link>
      )}
    </div>
  );
};

export default ToTopButton;
