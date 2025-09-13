import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import InputField from "./InputField";
import AuthButton from "./AuthButton";
import LoadingSpinner from "./LoadingSpinner";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AccessDeniedModal from "./AccessDeniedModal";
import NotFoundPage from "../pages/NotFoundPage";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showAccessDenied, setShowAccessDenied] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path or default to dashboard
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form);
    if (result?.success) {
      // Redirect all users to dashboard
      navigate("/", { replace: true });
    } else if (result?.error === "Invalid email or password") {
      setShowAccessDenied(true);
    } else {
      setShowNotFound(true);
    }
  };

  const isFormValid = form.email && form.password;

  if (showNotFound) return <NotFoundPage />;

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center px-2 sm:px-0 space-y-4"
        noValidate
        autoComplete="off"
      >
        <InputField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          className="mb-2"
          placeholder="Email"
          autoComplete="username"
          error={!!error}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
          className="mb-2"
          placeholder="Password"
          autoComplete="new-password"
          error={!!error}
        />
        <div className="flex justify-end w-full mb-3">
          <Link to="/forgot-password" className="text-xs text-button_primary underline">
            Forgot password?
          </Link>
        </div>
        <AuthButton
          type="submit"
          active={isFormValid}
          isLoading={isLoading}
          disabled={isLoading || !isFormValid}
        >
          <span className="flex items-center justify-center">
            {isLoading && (
              <span className="mr-2">
                <LoadingSpinner size="small" color="white" />
              </span>
            )}
            Login
          </span>
        </AuthButton>
      </form>
      <AccessDeniedModal open={showAccessDenied} onClose={() => setShowAccessDenied(false)} />
    </>
  );
};

export default LoginForm;