import React from "react";

const Checkbox = ({className, onChange, checked}) => {
  return (
    <input type='checkbox' className={className} checked={checked} onChange={onChange}/>
  );
};

export default React.memo(Checkbox);
