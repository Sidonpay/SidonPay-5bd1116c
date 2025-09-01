import React from 'react';
import LogoIcon from "../components/LogoIcon";
import AuthFooter from "../components/AuthFooter";
import { Outlet } from "react-router-dom";
import { ForgotPasswordProvider } from "../contexts/ForgotPasswordContext";

const ForgotPasswordPage = () => (
  <ForgotPasswordProvider>
    <LogoIcon />
    <div className="my-4">
      <Outlet />
    </div>
    <AuthFooter />
  </ForgotPasswordProvider>
);

export default ForgotPasswordPage;
