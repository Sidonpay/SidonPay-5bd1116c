// Main Dependency Imports
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// Layouts
import AuthLayout from "./components/AuthLayout";
import DashboardLayout from "./components/DashboardLayout";

// Protectors
import ProtectedRoute from "./components/ProtectedRoute";

// Providers
import { AuthProvider } from "./contexts/AuthContext";
import SidebarContext from "./contexts/SidebarContext";
import CurrentPage from "./contexts/CurrentPageContext.jsx";
import NotificationContext from "./contexts/NotificationContext.jsx";
import {
  PaymentReceiptContext,
  ShowReceiptContext,
} from "./contexts/PaymentReceiptContext.jsx";
import {
  ShowPaymentFormContext,
  PaymentFormDetailsContext,
  PaymentFormPreviewContext,
} from "./contexts/PaymentFormContext.jsx";

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
import NewCredentialsPage from "./pages/NewCredentialsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage";
import CreateAdminProfilePage from "./pages/CreateAdminProfilePage";
import CreatePaymentPage from "./pages/CreatePaymentPage.jsx";

// Forgot Password Steps (Components)
import ForgotPasswordRequest from "./components/ForgotPasswordRequest";
import ForgotPasswordEmailSent from "./components/ForgotPasswordEmailSent";
import ForgotPasswordVerify from "./components/ForgotPasswordVerify";

const App = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("Home");
  const [notify, setNotify] = useState(false);

  // payment/receipt + form state for contexts
  const [paymentReceipt, setPaymentReceipt] = useState({});
  const [showReceipt, setShowReceipt] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [formDetails, setFormDetails] = useState({});
  const [paymentFormPreview, setPaymentFormPreview] = useState(false);

  return (
    <div className="font-mont bg-base_white">
      <BrowserRouter>
        <AuthProvider>
          <SidebarContext.Provider value={{ open, setOpen }}>
            <CurrentPage.Provider value={{ page, setPage }}>
              <NotificationContext.Provider value={{ notify, setNotify }}>
                {/* Payment contexts from staging (wrap the routes so all pages can use them) */}
                <PaymentReceiptContext.Provider
                  value={{ paymentReceipt, setPaymentReceipt }}
                >
                  <ShowReceiptContext.Provider
                    value={{ showReceipt, setShowReceipt }}
                  >
                    <ShowPaymentFormContext.Provider
                      value={{ showForm, setShowForm }}
                    >
                      <PaymentFormDetailsContext.Provider
                        value={{ formDetails, setFormDetails }}
                      >
                        <PaymentFormPreviewContext.Provider
                          value={{
                            paymentFormPreview,
                            setPaymentFormPreview,
                          }}
                        >
                          <Routes>
                            {/* Auth */}
                            <Route
                              path="/login"
                              element={
                                <AuthLayout leftImage="/mu-sub-log.png">
                                  <LoginPage />
                                </AuthLayout>
                              }
                            />

                            {/* Forgot Password (nested) */}
                            <Route
                              path="/forgot-password"
                              element={
                                <AuthLayout leftImage="/mu-sub-log.png">
                                  <ForgotPasswordPage />
                                </AuthLayout>
                              }
                            >
                              <Route
                                index
                                element={<Navigate to="request" replace />}
                              />
                              <Route
                                path="request"
                                element={<ForgotPasswordRequest />}
                              />
                              <Route
                                path="email-sent"
                                element={<ForgotPasswordEmailSent />}
                              />
                              <Route
                                path="verify"
                                element={<ForgotPasswordVerify />}
                              />
                            </Route>

                            {/* New credentials routes */}
                            <Route
                              path="/reset-password/:token"
                              element={
                                <AuthLayout leftImage="/mu-sub-log.png">
                                  <NewCredentialsPage />
                                </AuthLayout>
                              }
                            />
                            <Route
                              path="/change-temp-password"
                              element={
                                <AuthLayout leftImage="/mu-sub-log.png">
                                  <NewCredentialsPage />
                                </AuthLayout>
                              }
                            />

                            {/* Create Admin Profile (super admin only) */}
                            <Route
                              path="/create-admin"
                              element={
                                <ProtectedRoute requiredRole="super_admin">
                                  <AuthLayout leftImage="/mu-sub-log.png">
                                    <CreateAdminProfilePage />
                                  </AuthLayout>
                                </ProtectedRoute>
                              }
                            />

                            {/* Protected app shell */}
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
                              <Route
                                path="disputes"
                                element={<DisputesPage />}
                              />
                              <Route path="payouts" element={<PayoutsPage />} />
                              <Route
                                path="all-transactions"
                                element={<AllTransactionsPage />}
                              />
                              {/* From staging */}
                              <Route
                                path="create-payment"
                                element={<CreatePaymentPage />}
                              />
                            </Route>

                            {/* 404 */}
                            <Route path="*" element={<NotFoundPage />} />
                          </Routes>
                        </PaymentFormPreviewContext.Provider>
                      </PaymentFormDetailsContext.Provider>
                    </ShowPaymentFormContext.Provider>
                  </ShowReceiptContext.Provider>
                </PaymentReceiptContext.Provider>
              </NotificationContext.Provider>
            </CurrentPage.Provider>
          </SidebarContext.Provider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
