// Main Dependency Imports
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import AuthLayout from "./components/AuthLayout";
import DashboardLayout from "./components/DashboardLayout";

// Protectors
import ProtectedRoute from "./components/ProtectedRoute";

// Providers

import { AuthProvider } from "./contexts/AuthContext";

// Pages
import OverviewPage from "./pages/OverviewPage";
import PaymentProcessingPage from "./pages/PaymentProcessingPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <div className="font-mont">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="/login"
              element={
                <AuthLayout>
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
              {/* other routes */}
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
