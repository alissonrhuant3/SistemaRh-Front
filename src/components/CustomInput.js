import React from "react";

const CustomInput = (props) => {
  const { type, label, id, i_class, name, val, onCh, onBl } = props;
  return (
    <div class="form-floating">
      <input
        type={type}
        class={`form-control ${i_class}`}
        id={id}
        placeholder={label}
        name={name}
        value={val}
        onChange={onCh}
        onBlur={onBl}
      />
      <label htmlFor={label}>{ label }</label>
    </div>
  );
};

export default CustomInput;
