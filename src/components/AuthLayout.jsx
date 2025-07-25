import PropTypes from "prop-types";

const AuthLayout = ({ leftImage, children }) => (
  <div className="min-h-screen bg-base_white flex items-center justify-center">
    <div className="flex w-[800px] max-w-full h-[460px] rounded-xl shadow-xl bg-white overflow-hidden relative flex-col sm:flex-row">
      {/* Left Section - Hide on small screens */}
      <div className="hidden sm:block relative w-[350px] h-full p-0">
        <img
          src={leftImage}
          alt="Login Illustration"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </div>
      {/* Right Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-10">
        <div className="w-full max-w-[320px]">{children}</div>
      </div>
    </div>
  </div>
);

AuthLayout.propTypes = {
  leftImage: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
