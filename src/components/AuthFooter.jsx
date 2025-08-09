import PropTypes from "prop-types";

const AuthFooter = ({infoText = "Don't have a profile?",bottomText = "Contact IT department",}) => (
  <div className="flex flex-col items-center mt-8">
    <div className="flex items-center justify-center w-full">
      {/* Left dot and line */}
      <div className="flex items-center">
        <div className="w-2 h-2 bg-black rounded-full" />
        <div className="h-0.5 w-16 bg-black" />
      </div>
      {/* Center text */}
      <span className="mx-4 text-sm text-secondary">{infoText}</span>
      {/* Right line and dot */}
      <div className="flex items-center">
        <div className="h-0.5 w-16 bg-black" />
        <div className="w-2 h-2 bg-black rounded-full" />
      </div>
    </div>
    <span className="text-xs text-secondary mt-1">{bottomText}</span>
  </div>
);

AuthFooter.propTypes = {
  infoText: PropTypes.string,
  bottomText: PropTypes.string,
};

export default AuthFooter;