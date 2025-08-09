/*
  AuthContext for SidonPay Internal Dashboard
  
  This is an internal admin dashboard for managing mobile app data.
  User registration is handled by backend/admin - no self-registration needed.
  
  MOCK LOGIN CREDENTIALS (for development):
  - admin@sidonpay.com / password123 (Super Admin)
  - analyst@sidonpay.com / password123 (Analyst)
  
  TODO: Replace mock functions with real API calls when backend is ready
*/

import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Token management
const TOKEN_KEY = "auth_token";
const USER_KEY = "user_data";

const tokenService = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token) => localStorage.setItem(TOKEN_KEY, token),
  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
  getUser: () => {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  },
  setUser: (user) => localStorage.setItem(USER_KEY, JSON.stringify(user)),
};

// Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already authenticated on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = tokenService.getToken();
      const userData = tokenService.getUser();

      if (token && userData) {
        // For now, mock token verification (until backend is ready)
        try {
          // TODO: Replace with real API call when backend is ready
          // const response = await fetch('/api/auth/verify', {
          //   method: 'GET',
          //   headers: {
          //     'Authorization': `Bearer ${token}`,
          //     'Content-Type': 'application/json'
          //   }
          // })

          // Mock response - assume token is valid if it exists
          const mockResponse = { ok: true };

          if (mockResponse.ok) {
            setUser(userData);
            setIsAuthenticated(true);
            setIsLoading(false);
            setError(null);
          } else {
            tokenService.removeToken();
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Auth verification error:", error);
          tokenService.removeToken();
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (credentials) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with real API call when backend is ready
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(credentials)
      // })

      // Mock login response for development
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

      // Mock authentication logic
      const { email, password } = credentials;

      // Mock admin users (replace with real backend authentication)
      const mockUsers = {
        "admin@sidonpay.com": {
          id: 1,
          name: "Admin User",
          email: "admin@sidonpay.com",
          role: "super_admin",
          permissions: [
            "view_dashboard",
            "manage_users",
            "view_payments",
            "manage_payments",
          ],
        },
        "analyst@sidonpay.com": {
          id: 2,
          name: "Data Analyst",
          email: "analyst@sidonpay.com",
          role: "analyst",
          permissions: ["view_dashboard", "view_payments"],
        },
      };

      // Mock login validation
      if (mockUsers[email] && password === "password123") {
        const userData = mockUsers[email];
        const token = `mock_token_${userData.id}_${Date.now()}`;

        // Store token and user data
        tokenService.setToken(token);
        tokenService.setUser(userData);

        setUser(userData);
        setIsAuthenticated(true);
        setIsLoading(false);
        setError(null);

        return { success: true, user: userData };
      } else {
        const errorMessage = "Invalid email or password";
        setUser(null);
        setIsAuthenticated(false);
        setIsLoading(false);
        setError(errorMessage);

        return { success: false, error: errorMessage };
      }

      // Real API implementation (commented out for now)
      // const data = await response.json()
      // if (response.ok) {
      //   const { user, token } = data
      //   tokenService.setToken(token)
      //   tokenService.setUser(user)
      //   setUser(user)
      //   setIsAuthenticated(true)
      //   setIsLoading(false)
      //   setError(null)
      //   return { success: true, user }
      // } else {
      //   setUser(null)
      //   setIsAuthenticated(false)
      //   setIsLoading(false)
      //   setError(data.message || 'Login failed')
      //   return { success: false, error: data.message || 'Login failed' }
      // }
    } catch (error) {
      const errorMessage = "Network error. Please try again.";
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      setError(errorMessage);

      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // TODO: Replace with real API call when backend is ready
      // const token = tokenService.getToken()
      // if (token) {
      //   await fetch('/api/auth/logout', {
      //     method: 'POST',
      //     headers: {
      //       'Authorization': `Bearer ${token}`,
      //       'Content-Type': 'application/json'
      //     }
      //   })
      // }

      // For now, just simulate logout
      console.log("User logged out");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clear local storage and update state
      tokenService.removeToken();
      setUser(null);
      setIsAuthenticated(false);
      setIsLoading(false);
      setError(null);
    }
  };

  // Forgot password function
  // const forgotPassword = async (email) => {
  //   try {
  //     const response = await fetch("/api/auth/forgot-password", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       return { success: true, message: data.message };
  //     } else {
  //       return {
  //         success: false,
  //         error: data.message || "Failed to send reset email",
  //       };
  //     }
  //   } catch (error) {
  //     return { success: false, error: "Network error. Please try again." };
  //   }
  // };

  // Forgot password function (mock data)
      const forgotPassword = async (email) => {
        try {
          // Simulate network delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock users (same as your login mock)
        const mockUsers = {
          "admin@sidonpay.com": true,
          "analyst@sidonpay.com": true,
        };

        if (mockUsers[email]) {
          // Simulate success
          return { success: true, message: "Reset email sent!" };
        } else {
          // Simulate error for unknown email
          return { success: false, error: "Email not found." };
        }
      } catch (error) {
        return { success: false, error: "Network error. Please try again." };
      }
    };


    // Verify reset code function (mock)
    const verifyResetCode = async (email, code) => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // List of validate codes
        const validCodes = ["1234", "5678", "9012", "9999", "4321"]; // Mock valid codes

        if (validCodes.includes(code)) {
          return { success: true };
        }
        return { success: false, error: "Invalid code." };
      } catch (error) {
        return { success: false, error: "Network error. Please try again." };
      }
    };

  // Reset password function
  const resetPassword = async (token, password) => {
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, message: data.message };
      } else {
        return {
          success: false,
          error: data.message || "Failed to reset password",
        };
      }
    } catch (error) {
      return { success: false, error: "Network error. Please try again." };
    }
  };

  // Update user function
  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    tokenService.setUser(updatedUser);
    setUser(updatedUser);
  };

  // Clear error function
  const clearError = () => {
    setError(null);
  };

  // Check if user has specific permission
  const hasPermission = (permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };

  // Check if user has specific role
  const hasRole = (role) => {
    if (!user || !user.role) return false;
    return user.role === role;
  };

  const value = {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,

    // Actions
    login,
    logout,
    forgotPassword,
    verifyResetCode,
    resetPassword,
    updateUser,
    clearError,

    // Utilities
    hasPermission,
    hasRole,
    getToken: tokenService.getToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;