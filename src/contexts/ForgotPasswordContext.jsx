import { createContext, useContext, useState } from "react";

const ForgotPasswordContext = createContext();

export const useForgotPassword = () => useContext(ForgotPasswordContext);

export const ForgotPasswordProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  return (
    <ForgotPasswordContext.Provider value={{ email, setEmail, code, setCode }}>
      {children}
    </ForgotPasswordContext.Provider>
  );
};