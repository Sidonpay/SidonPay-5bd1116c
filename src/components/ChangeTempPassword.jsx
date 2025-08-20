import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import InputField from "./InputField";
import AuthButton from "./AuthButton";
import EyeIcon from "./EyeIcon";
import LogoIcon from "./LogoIcon";

const ChangeTempPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  const [tempPassword] = useState(params.get("temp") || "");
  const [showTemp, setShowTemp] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Get token from query params or use a demo token
      const token = params.get("token") || "demo-token";
      // Navigate to reset password page
      navigate(`/reset-password/${token}`, { replace: true });
    }, 1200); // Simulate API delay
  };

  return (
    <div className="pb-20">
      <h2 className="text-[1.35rem] font-bold mt-4">
        Change Temp Password
      </h2>
      <p className="mb-10 text-[11px] text-[#7B7B7B]">
        For your security, please change your temporary <br /> password to continue.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          type={showTemp ? "text" : "password"}
          label="Temporary Password"
          value={tempPassword}
          readOnly
          required
          placeholder="Temporary Password"
            // TODO: Add validation for temp password length/format when backend requirements are known
          rightIcon={
            <button
              type="button"
              tabIndex={-1}
              className="outline-none"
              onClick={() => setShowTemp((v) => !v)}
              aria-label={showTemp ? "Hide password" : "Show password"}
            >
              <EyeIcon open={showTemp} size={16} />
            </button>
          }
        />
        <AuthButton
          type="submit"
          active={!!tempPassword}
          disabled={loading || !tempPassword}
          isLoading={loading}
        >
          Change Password
        </AuthButton>
      </form>
    </div>
  );
};

export default ChangeTempPassword;