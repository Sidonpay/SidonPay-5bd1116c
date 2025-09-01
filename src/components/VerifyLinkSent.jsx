import React from "react";
import AuthButton from "./AuthButton";

const maskEmail = (email) => {
  if (!email) return "";
  const [user, domain] = email.split("@");
  return (
    user[0] +
    "*".repeat(Math.max(user.length - 2, 0)) +
    user.slice(-1) +
    "@" +
    domain[0] +
    "*".repeat(Math.max(domain.length - 6, 0)) +
    domain.slice(-5)
  );
};

const VerifyLinkSent = ({ email, onCreateMore }) => (
  <div className="w-full max-w-md mx-auto flex flex-col pb-12 ">
    <h2 className="text-xl font-bold my-2">Verify Link Sent</h2>
    <div className="text-[#646D7A] text-xs mb-4">
      We have sent a verification email to{" "}
      <span className="">{maskEmail(email)}</span>
    </div>
    <AuthButton
      type="button"
      active={true}
      onClick={onCreateMore}
      className="mb-3"
    >
      Create More Profile
    </AuthButton>
    <button
      onClick={() => (window.location.href = "/dashboard")}
      className="text-[#2B9373] text-sm text-base underline mt-3"
    >
      Back to Dashboard
    </button>
  </div>
);

export default VerifyLinkSent;