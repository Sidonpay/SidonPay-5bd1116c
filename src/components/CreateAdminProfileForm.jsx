import { useState, useEffect } from "react";
import InputField from "./InputField";
import AuthButton from "./AuthButton";
import LoadingSpinner from "./LoadingSpinner";
import VerifyLinkSent from "./VerifyLinkSent";

const CreateAdminProfileForm = ({ onSuccess }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [agreed, setAgreed]       = useState(false);
  const [loading, setLoading]     = useState(false);

  // Persisted state
  const [showVerify, setShowVerify] = useState(() => {
    return localStorage.getItem("showVerify") === "true";
  });
  const [createdEmail, setCreatedEmail] = useState(() => {
    return localStorage.getItem("createdEmail") || "";
  });

  useEffect(() => {
    localStorage.setItem("showVerify", showVerify);
    localStorage.setItem("createdEmail", createdEmail);
  }, [showVerify, createdEmail]);

  function generatePassword() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let pass = "";
    for (let i = 0; i < 16; i++) pass += chars[Math.floor(Math.random() * chars.length)];
    setPassword(pass);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!agreed) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCreatedEmail(email);
      setShowVerify(true);
      if (onSuccess) onSuccess(email);
    }, 1800);
  }

  const handleCreateMore = () => {
    setShowVerify(false);
    setCreatedEmail("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setAgreed(false);
    localStorage.removeItem("showVerify");
    localStorage.removeItem("createdEmail");
  };

  const isFormValid = firstName && lastName && email && password && agreed;

  if (showVerify) {
    return <VerifyLinkSent email={createdEmail} onCreateMore={handleCreateMore} />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold my-3 ">Create New Admin Profile</h2>
      <div className="flex gap-2">
        <InputField
          name="firstName"
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          required
          className="w-1/2"
        />
        <InputField
          name="lastName"
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          required
          className="w-1/2"
        />
      </div>
      <InputField
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <div className="relative w-full">
        <InputField
          name="password"
          type="text"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button
          type="button"
          className="absolute top-1/2 right-3 -translate-y-1/2 text-[#2B9373] font-medium text-xs underline"
          onClick={generatePassword}
          tabIndex={0}
        >
          Auto generate
        </button>
      </div>
      <div className="flex items-center">
        <input
          id="terms"
          type="checkbox"
          checked={agreed}
          onChange={e => setAgreed(e.target.checked)}
          className="mr-2 accent-[#256B3B]"
          required
        />
        <label htmlFor="terms" className="text-[10px] text-[#A7A7A7]">
          I agree to the SidonPay Terms of Service and Privacy Policy
        </label>
      </div>
      <AuthButton
        type="submit"
        active={isFormValid}
        isLoading={loading}
        disabled={!isFormValid || loading}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <LoadingSpinner size="small" color="white" />
            Create Profile
          </span>
        ) : (
          "Create Profile"
        )}
      </AuthButton>
    </form>
  );
};

export default CreateAdminProfileForm;