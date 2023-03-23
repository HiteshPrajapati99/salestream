import React, { useState } from 'react'

export default function useStickyTitle() {
    const [isSticky, setisSticky] = useState(false);

  const handlesticky = () => {
    if (window.scrollY > 0 && !isSticky) {
      setisSticky(true);
    } else if (window.scrollY === 0 && isSticky) {
      setisSticky(false);
    }
  };

  window.addEventListener("scroll", handlesticky);
  if(isSticky) {
      return "top-title-active"
  }else{
    return "top-title"
  }
}
