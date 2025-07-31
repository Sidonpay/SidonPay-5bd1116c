import { useRef, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import AuthButton from "./AuthButton";
import LoadingSpinner from "./LoadingSpinner";
import { SpinnerOverlay, SuccessOverlay } from "./VerifyOverlay";
import { useForgotPassword } from "../contexts/ForgotPasswordContext";
import { useNavigate } from "react-router-dom";

const CODE_LENGTH = 4;

const ForgotPasswordVerify = () => {
  const { email, setEmail, code, setCode } = useForgotPassword();
  const { verifyResetCode } = useAuth();
  const [input, setInput] = useState(Array(CODE_LENGTH).fill(""));
  const [timer, setTimer] = useState(120);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successAnim, setSuccessAnim] = useState(false);
  const codeRefs = useRef([]);
  const navigate = useNavigate();

  // Restore email from localStorage if missing (e.g., after refresh)
  // Redirect to reequest if not found
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

  useEffect(() => {
    if (timer <= 0 || loading) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, loading]);

  const handleChange = (val, idx) => {
    if (!/^[0-9]?$/.test(val)) return;
    const arr = [...input];
    arr[idx] = val;
    setInput(arr);
    setCode(arr.join(""));
    if (val && idx < CODE_LENGTH - 1) {
      codeRefs.current[idx + 1]?.focus();
    }
    setError(false);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (input.join("").length !== CODE_LENGTH) return;
    setLoading(true);
    const result = await verifyResetCode(email, input.join(""));
    if (result.success) {
      setTimeout(() => {
        setSuccessAnim(true);
        setTimeout(() => {
          setLoading(false);
          setSuccessAnim(false);
          navigate("/forgot-password/reset");
        }, 900);
      }, 900);
    } else {
      setLoading(false);
      setError(true);
    }
  };

  const handleResend = () => {
    setTimer(120);
    setInput(Array(CODE_LENGTH).fill(""));
    setCode("");
    setError(false);
  };

  const isCodeComplete = input.every((v) => v && v.length === 1);

  return (
    <>
      <h2 className="text-[1.35rem] font-bold my-4">Code Verification</h2>
      <form onSubmit={handleVerify} className="w-full flex flex-col px-2 sm:px-0 space-y-2">
        <p className="text-xs text-gray-500 mb-2 ">
          Enter OTP (One time password) sent to<br />
          <span className="">{email}</span>
        </p>
        <div className="flex justify-start gap-8 mb-2">
          {Array(CODE_LENGTH).fill(0).map((_, idx) => (
            <input
              key={idx}
              ref={el => codeRefs.current[idx] = el}
              type="password"
              maxLength={1}
              value={input[idx]}
              onChange={e => handleChange(e.target.value, idx)}
              className={`w-10 h-10 border rounded text-center text-[2rem] text-[#2D7A51] bg-[#DDE5EF] leading-none focus:bg-[#DDE5EF] focus:border-[#5fd068] focus:ring-0 outline-none transition caret-transparent
                ${error ? "border-red-500" : "border-[#e0e8ef]"}`}
              disabled={loading}
              autoFocus={idx === 0}
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
            />
          ))}
        </div>
        <div className="flex items-center mb-2 text-xs text-gray-400">
          <span>
            {`${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, "0")} Mins`}
          </span>
          {error && (
            <span className="ml-auto text-red-500 font-semibold">Invalid code</span>
          )}
        </div>
        <AuthButton
          type="submit"
          className="w-full mb-2"
          active={isCodeComplete}
          isLoading={loading}
          disabled={loading || !isCodeComplete}
        >
          <span className="flex items-center justify-center">
            {loading && (
              <span className="mr-2">
                <LoadingSpinner size="small" color="white" />
              </span>
            )}
            Verify Code
          </span>
        </AuthButton>
        <button
          className="w-full text-center text-button_primary font-bold text-xs underline"
          type="button"
          onClick={handleResend}
          disabled={loading}
        >
          Resend Code
        </button>
        {loading && !successAnim && <SpinnerOverlay />}
        {successAnim && <SuccessOverlay />}
      </form>
    </>
  );
};

export default ForgotPasswordVerify;