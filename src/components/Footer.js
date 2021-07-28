import React from "react";
import Button from "./Button";

const Footer = ({ filterValue, eventClickOnFilter, eventRemoveAllChecked, notComplitedTodo, isActiveFooterBtnDelAll}) => {

  return (
    <footer className='footer'>
      <span id='span'>
        {notComplitedTodo} items left.
      </span>
      <ul className='filter-list-footer'>
        <li id='all' className={filterValue === 'all'? 'filter-footer selected': 'filter-footer'} onClick={() => eventClickOnFilter('all')}>All</li>
        <li id='active' className={filterValue === 'active'? 'filter-footer selected': 'filter-footer'} onClick={() => eventClickOnFilter('active')}>Active</li>
        <li id='complited' className={filterValue === 'complited'? 'filter-footer selected': 'filter-footer'} onClick={() => eventClickOnFilter('complited')}>Complited</li>
      </ul>
      <Button className={`footer-button-del ${isActiveFooterBtnDelAll ? '' : 'not-active'}`} label={'Clear complited'} onClick={eventRemoveAllChecked}/>
    </footer>
  );
};

export default React.memo(Footer);