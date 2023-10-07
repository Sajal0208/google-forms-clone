import React, { useState, useRef, useEffect } from "react";

interface InputProps {
  className: string;
  value: string;
  onChange: (value: string) => void;
  onClick: () => void;
}

const InputComponent = (
  { className, value, onClick, onChange }: InputProps,
  innerRef: React.Ref<HTMLInputElement>,
) => {
  return (
    <input
      className={className}
      type="text"
      value={value}
      ref={innerRef}
      onChange={(e) => onChange(e.target.value)}
      onClick={onClick}
    />
  );
};

export default React.forwardRef(InputComponent);
