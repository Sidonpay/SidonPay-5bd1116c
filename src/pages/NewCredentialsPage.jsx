import LogoIcon from "../components/LogoIcon";
import ResetPassword from "../components/ResetPassword";
import ChangeTempPassword from "../components/ChangeTempPassword";
import { useParams, useLocation } from "react-router-dom";

export default function NewCredentialsPage() {
  const { token } = useParams();
  const location = useLocation();

  // Decide which form to show based on the route
  const isReset = location.pathname.startsWith("/reset-password");

  return (
    <div>
      <div >
        <LogoIcon/>
        {isReset ? (
          <ResetPassword token={token} />
        ) : (
          <ChangeTempPassword />
        )}
      </div>
    </div>
  );
}