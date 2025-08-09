import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import InputField from "./InputField";
import AuthButton from "./AuthButton";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate, Link } from "react-router-dom";
import { useForgotPassword } from "../contexts/ForgotPasswordContext";

const ForgotPasswordRequest = () => {
  const { email, setEmail } = useForgotPassword();
  const [inputValue, setInputValue] = useState(email);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  // Clear email from context and localStorage on mount
  useEffect(() => {
    setEmail("");
    localStorage.removeItem("forgotEmail");
  }, [setEmail]);

  const handleChange = (e) => setInputValue(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await forgotPassword(inputValue);
    setLoading(false);
    if (result.success) {
      setEmail(inputValue);
      localStorage.setItem("forgotEmail", inputValue); // Save to localStorage for persistence
      navigate("/forgot-password/email-sent");
    } else {
      setError(result.error || "Unable to process request.");
    }
  };

  const isFormValid = !!inputValue;

  return (
    <>
      <h2 className="text-[1.35rem] font-bold my-4">Forgot password</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col px-2 sm:px-0 space-y-3"
        noValidate
        autoComplete="off"
      >
        <div className="text-xs text-gray-400 w-full">
          Provide the email address linked with your <br />profile to reset your password
        </div>
        <InputField
          label="Email"
          name="email"
          type="email"
          value={inputValue}
          onChange={handleChange}
          required
          className="mb-2"
          placeholder="Email"
          autoComplete="username"
          error={!!error}
        />
        <span className={`text-xs mt-2 ${error ? "text-red-500" : "text-contrast"}`}>
          {error ? error : "Please enter your registered email"}
        </span>
        <AuthButton
          type="submit"
          active={isFormValid}
          isLoading={loading}
          disabled={loading || !isFormValid}
        >
          <span className="flex items-center justify-center">
            {loading && (
              <span className="mr-2">
                <LoadingSpinner size="small" color="white" />
              </span>
            )}
            Request Reset Code
          </span>
        </AuthButton>
        <div className="flex justify-center w-full">
          <Link to="/login" className="text-xs text-button_primary font-bold underline">
            Cancel
          </Link>
        </div>
      </form>
    </>
  );
};

export default ForgotPasswordRequest;