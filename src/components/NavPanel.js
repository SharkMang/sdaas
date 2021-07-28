import React from "react";
import NavItem from "./NavItem";

const Navigator = ({totalPages, currentPage, eventClickOnPage}) => {

  if (totalPages > 1) {
    let navList = [];

    for(let i = 1; i <= totalPages; i++) {
      navList.push(<NavItem key={i} navId={i} className={`li-nav-section ${i === currentPage ? 'selected' : ''}`} onClick={eventClickOnPage}/>);
    }

    return (
      <section>
        <ul className='ul-nav-section'>
          {navList}
        </ul>
      </section>
    );
  } else {
    return <></>;
  }
}

export default React.memo(Navigator);