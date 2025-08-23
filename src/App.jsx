// Main Dependency Imports
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
  PaymentFormPreviewContext
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
import { useState } from "react";
import CreatePaymentPage from "./pages/CreatePaymentPage.jsx";

const App = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState("Home");
  const [notify, setNotify] = useState(false);
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
                          value={{ paymentFormPreview, setPaymentFormPreview }}>
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
                            <Route
                              path="create-payment"
                              element={<CreatePaymentPage />}
                            />
                            {/* other routes */}
                          </Route>
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
