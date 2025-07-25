import LogoIcon from "../components/LogoIcon";
import AuthFooter from "../components/AuthFooter";
import LoginForm from "../components/LoginForm";

const LoginPage = () => (
  <>
    <LogoIcon />
    <h2 className="text-[1.35rem] font-bold my-4">
      Sign into your dashboard
    </h2>
    <LoginForm />
    <AuthFooter />
  </>
);

export default LoginPage;
