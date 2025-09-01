import AuthButton from "./AuthButton";
import { useNavigate } from "react-router-dom";
import { useForgotPassword } from "../contexts/ForgotPasswordContext";
import { useEffect } from "react";

const ForgotPasswordEmailSent = () => {
  const { email, setEmail } = useForgotPassword();
  const navigate = useNavigate();

  // Restore email from localStorage if missing (e.g., after refresh)
  // Redirect to request if not found
  useEffect(() => {
    if (!email) {
      const storedEmail = localStorage.getItem("forgotEmail");
      if (storedEmail) {
        setEmail(storedEmail);
      } else {
        navigate("/forgot-password/request", { replace: true });
      }
    }
  }, [email, setEmail, navigate]);

  return (
    <>
      <h2 className="text-[1.35rem] font-bold my-4">Forgot password</h2>
      <div className="w-full flex flex-col px-2 sm:px-0 space-y-4">
        <p className="text-xs text-gray-500 mb-3">
          You will receive an email with verification code to <br /> reset your password. Please check your inbox
        </p>
        <AuthButton
          type="button"
          className="w-full"
          onClick={() => navigate("/forgot-password/verify")}
        >
          Send Reset Code
        </AuthButton>
        <div className="flex justify-center w-full pb-16">
          <button
            type="button"
            className="text-xs text-button_primary font-bold underline"
            onClick={() => navigate("/forgot-password/request")}
          >
            Change email address
          </button>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordEmailSent;