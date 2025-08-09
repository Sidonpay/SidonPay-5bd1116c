import React from 'react';
import LogoIcon from "../components/LogoIcon";
import AuthFooter from "../components/AuthFooter";
import { Outlet, useLocation } from "react-router-dom";
import { ForgotPasswordProvider } from "../contexts/ForgotPasswordContext";

const ForgotPasswordPage = () => {
  const location = useLocation();
  const hideFooter = location.pathname.endsWith("/reset");

  return (
    <ForgotPasswordProvider>
      <LogoIcon />
      <div className="my-4">
        <Outlet />
      </div>
      {!hideFooter && <AuthFooter />}
    </ForgotPasswordProvider>
  );
};

export default ForgotPasswordPage;
