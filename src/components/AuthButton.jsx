import PropTypes from "prop-types";

const AuthButton = ({
  children,
  active = true,
  isLoading = false,
  showCheck = false, // <-- Add this line
  className = "",
  ...props
}) => (
  <button
    className={`w-full font-semibold py-2 rounded-lg mt-2 transition
      ${active
        ? "bg-brand_color1 text-white cursor-pointer"
        : "bg-[#55BB841A] text-[#2D7A5199] cursor-not-allowed"
      }
      ${isLoading}
    `}
    disabled={isLoading || !active}
    {...props}
  >
    {children}
    {showCheck && (
      <span className="ml-2 text-green-500" aria-label="Success">
        ✔
      </span>
    )}
  </button>
);

AuthButton.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
  isLoading: PropTypes.bool,
  showCheck: PropTypes.bool, // <-- Add this line
};

export default AuthButton;