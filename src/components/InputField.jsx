import React from 'react'
import PropTypes from "prop-types";
import ErrorIcon from "./ErrorIcon"; 

const InputField = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  className = "",
  inputClassName = "",
  error = false,
  errorMessage,
  rightIcon,
  showErrorIcon, 
  ...rest
}) => (
  <div className={`w-full ${className}`}>
    <div className="relative">
      <input
        type={type}
        name={name}
        placeholder={placeholder || label}
        autoComplete="off"
        value={value}
        onChange={onChange}
        className={`block w-full rounded-lg px-4 py-2 text-base bg-[#DDE5EF4D] transition ${error ? "border-2 border-red-500" : "border border-[#DDE5EF]"} focus:border-base_gray focus:outline-none ${inputClassName}`}
        {...rest}
      />
      {rightIcon && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
          {rightIcon}
        </span>
      )}
      {showErrorIcon && (
        <span className="absolute right-[-28px] top-1/2 -translate-y-1/2">
          <ErrorIcon size={20} />
        </span>
      )}
    </div>
    {error && errorMessage && (
      <div className="text-xs text-red-500 mt-1">{errorMessage}</div>
    )}
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
  errorMessage: PropTypes.string,
  rightIcon: PropTypes.node,
  showErrorIcon: PropTypes.bool, 
};
InputField.defaultProps = {
  type: "text",
  error: false,
};

export default InputField;
