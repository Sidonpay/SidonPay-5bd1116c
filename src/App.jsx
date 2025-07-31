// Main Dependency Imports
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import AuthLayout from "./components/AuthLayout";
import DashboardLayout from "./components/DashboardLayout";

// Protectors
import ProtectedRoute from "./components/ProtectedRoute";

// Providers
import { AuthProvider } from "./contexts/AuthContext";
import SidebarContext from "./contexts/SidebarContext";
import CurrentPage from "./contexts/CurrentPageContext.jsx";

// Pages
import OverviewPage from "./pages/OverviewPage";
import PaymentProcessingPage from "./pages/PaymentProcessingPage";
import LoginPage from "./pages/LoginPage";
import UserProfilePage from "./pages/UserProfilePage";
import ReviewsPage from "./pages/ReviewsPage";
import DisputesPage from "./pages/DisputesPage";
import PayoutsPage from "./pages/PayoutsPage";
import AllTransactionsPage from "./pages/AllTransactionsPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { useState } from "react";

// Forgot Password Steps (Components)
import ForgotPasswordRequest from "./components/ForgotPasswordRequest";
import ForgotPasswordEmailSent from "./components/ForgotPasswordEmailSent";
import ForgotPasswordVerify from "./components/ForgotPasswordVerify";
import ResetPassword from "./components/ResetPassword"; 

const App = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("");

  return (
    <div className="font-mont">
      <BrowserRouter>
        <AuthProvider>
          <SidebarContext.Provider value={{ open, setOpen }}>
            <CurrentPage.Provider value={{ page, setPage }}>
              <Routes>
                <Route
                  path="/login"
                  element={
                    <AuthLayout leftImage="/mu-sub-log.png">
                      <LoginPage />
                    </AuthLayout>
                  }
                />
                <Route
                  path="/forgot-password"
                  element={
                    <AuthLayout leftImage="/mu-sub-log.png">
                      <ForgotPasswordPage />
                    </AuthLayout>
                  }
                >
                  <Route index element={<Navigate to="request" replace />} />
                  <Route path="request" element={<ForgotPasswordRequest />} />
                  <Route path="email-sent" element={<ForgotPasswordEmailSent />} />
                  <Route path="verify" element={<ForgotPasswordVerify />} />
                  <Route path="reset" element={<ResetPassword />} />
                </Route>
                <Route
                  path="/"

                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<OverviewPage />} />
                  <Route
                    path="payments-processing"
                    element={<PaymentProcessingPage />}
                  />
                  <Route
                    path="update-user-profile"
                    element={<UserProfilePage />}
                  />
                  <Route path="reviews" element={<ReviewsPage />} />
                  <Route path="disputes" element={<DisputesPage />} />
                  <Route path="payouts" element={<PayoutsPage />} />
                  <Route
                    path="all-transactions"
                    element={<AllTransactionsPage />}
                  />
                  {/* other routes */}
                </Route>
              </Routes>
            </CurrentPage.Provider>
          </SidebarContext.Provider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;