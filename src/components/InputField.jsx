import React from 'react'
import PropTypes from "prop-types";

const InputField = ({label,type,name,value,onChange,placeholder,className = "",inputClassName = "", error=false, ...props}) => (
  <div className={`w-full ${className}`}>
    <input
      type={type}
      name={name}
      placeholder={placeholder || label}
      autoComplete="off"
      value={value}
      onChange={onChange}
      className={`block w-full rounded-lg px-4 py-2 text-base bg-[#DDE5EF4D] transition ${error ? "border-2 border-red-500" : "border border-[#DDE5EF]"} focus:border-base_gray focus:outline-none ${inputClassName}`}
      {...props}
    />
  </div>
);

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  error: PropTypes.bool,
};
InputField.defaultProps = {
  type: "text",
  error: false,
};

export default InputField;
