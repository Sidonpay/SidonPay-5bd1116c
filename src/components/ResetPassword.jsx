import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import AuthButton from "./AuthButton";
import EyeIcon from "./EyeIcon";
import RequirementItem from "./RequirementItem";
import LoadingSpinner from "./LoadingSpinner";

const initialReqs = {
  length: false,
  upper: false,
  numberOrSpecial: false,
};

function checkRequirements(pw) {
  return {
    length: pw.length >= 8,
    upper: /[A-Z]/.test(pw),
    numberOrSpecial: /[\d\W]/.test(pw),
  };
}

export default function ResetPassword({ email, token }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState({ password: "", confirm: "" });
  const [reqs, setReqs] = useState(initialReqs);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showReqError, setShowReqError] = useState(false);

  const navigate = useNavigate();

  function handlePasswordChange(e) {
    const val = e.target.value;
    setPassword(val);
    setReqs(checkRequirements(val));
    if (error.password) setError((er) => ({ ...er, password: "" }));
  }
  function handleConfirmChange(e) {
    setConfirm(e.target.value);
    if (error.confirm) setError((er) => ({ ...er, confirm: "" }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let errors = {};
    setShowReqError(false);

    if (!password) errors.password = "This is a required field.";
    if (!confirm) errors.confirm = "This is a required field.";
    if (password && confirm && password !== confirm)
      errors.confirm = "Passwords do not match.";

    const r = checkRequirements(password);
    if (!r.length || !r.upper || !r.numberOrSpecial) {
      setShowReqError(true);
    }

    setError(errors);
    if (Object.keys(errors).length || !r.length || !r.upper || !r.numberOrSpecial) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Clear sensitive info after successful reset
      localStorage.removeItem("forgotEmail");
      // If you use context for email/token, clear them here as well
    }, 1200);
  }

  // Button is green only if both fields are filled and match
  const canSubmit =
    password &&
    confirm &&
    password === confirm;

  if (success) {
    return (
      <>
        <h2 className="text-[1.35rem] font-bold my-2">New Credentials</h2>
        <div className="text-gray-500  text-xs">
          Your password has been successfully updated.
        </div>
        <AuthButton
          type="button"
          className="mt-3"
          onClick={() => navigate("/login", { replace: true })}
        >
          Sign in
        </AuthButton>
      </>
    );
  }

  return (
    <>
      <h2 className="text-[1.35rem] font-bold my-3">New Credentials</h2>
      <ul className="text-xs mb-4 mt-2 space-y-2 text-[#7B7B7B]">
        <RequirementItem
          checked={showReqError ? reqs.length : null}
          text="Password must be at least 8 characters long."
        />
        <RequirementItem
          checked={showReqError ? reqs.upper : null}
          text="Password must contain at least one upper case."
        />
        <RequirementItem
          checked={showReqError ? reqs.numberOrSpecial : null}
          text="Must have a number or special character."
        />
      </ul>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col px-2 sm:px-0 space-y-4"
        noValidate
        autoComplete="off"
      >
        <InputField
          type={showPw ? "text" : "password"}
          label="New Password"
          value={password}
          onChange={handlePasswordChange}
          required
          error={showReqError && (!reqs.length || !reqs.upper || !reqs.numberOrSpecial)}
          errorMessage={error.password && error.password !== "Password doesn't meet all requirements." ? error.password : ""}
          placeholder="New Password"
          rightIcon={
            <button
              type="button"
              tabIndex={-1}
              className="outline-none"
              onClick={() => setShowPw((s) => !s)}
            >
              <EyeIcon open={showPw} size={16} />
            </button>
          }
          showErrorIcon={showReqError && (!reqs.length || !reqs.upper || !reqs.numberOrSpecial)}
        />
        <InputField
          type={showConfirm ? "text" : "password"}
          label="Confirm Password"
          value={confirm}
          onChange={handleConfirmChange}
          required
          error={showReqError && (!reqs.length || !reqs.upper || !reqs.numberOrSpecial)}
          errorMessage={error.confirm}
          placeholder="Confirm Password"
          rightIcon={
            <button
              type="button"
              tabIndex={-1}
              className="outline-none"
              onClick={() => setShowConfirm((s) => !s)}
            >
              <EyeIcon open={showConfirm} size={16} />
            </button>
          }
          showErrorIcon={showReqError && (!reqs.length || !reqs.upper || !reqs.numberOrSpecial)}
        />
        <div className="mt-9" />
        <AuthButton
          type="submit"
          active={canSubmit}
          disabled={loading || !canSubmit}
          isLoading={loading}
          showCheck={false}
        >
          <span className="flex items-center justify-center">
            {loading && (
              <span className="mr-2">
                <LoadingSpinner size="small" color="white" />
              </span>
            )}
            Reset Password
          </span>
        </AuthButton>
      </form>
    </>
  );
}

ResetPassword.propTypes = {
  email: PropTypes.string,
  token: PropTypes.string,
};