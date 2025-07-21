import PropTypes from "prop-types";

function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
