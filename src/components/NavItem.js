import React from "react";

const NavItem = ({navId, className, onClick}) => {
  return (
    <li id={navId} className={className} onClick={() => onClick(navId)}>
      {navId} page
    </li>
  );
}

export default React.memo(NavItem);