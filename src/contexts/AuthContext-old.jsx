/*
  AuthContext for SidonPay Internal Dashboard
  
  This is an internal admin dashboard for managing mobile app data.
  User registration is handled by backend/admin - no self-registration needed.
  
  MOCK LOGIN CREDENTIALS (for development):
  - admin@sidonpay.com / password123 (Super Admin)
  - analyst@sidonpay.com / password123 (Analyst)
  
  TODO: Replace mock functions with real API calls when backend is ready
*/

import { createContext, useContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types";

// Initial auth state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Auth actions
const AUTH_ACTIONS = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  LOGOUT: "LOGOUT",
  SET_LOADING: "SET_LOADING",
  CLEAR_ERROR: "CLEAR_ERROR",
  UPDATE_USER: "UPDATE_USER",
};

// Auth reducer
function authReducer(state, action) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload.error,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case AUTH_ACTIONS.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

    default:
      return state;
  }
}

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
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is already authenticated on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = tokenService.getToken();
      const user = tokenService.getUser();

      if (token && user) {
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
            dispatch({
              type: AUTH_ACTIONS.LOGIN_SUCCESS,
              payload: { user },
            });
          } else {
            tokenService.removeToken();
            dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
          }
        } catch (error) {
          console.error("Auth verification error:", error);
          tokenService.removeToken();
          dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        }
      } else {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });

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
        const user = mockUsers[email];
        const token = `mock_token_${user.id}_${Date.now()}`;

        // Store token and user data
        tokenService.setToken(token);
        tokenService.setUser(user);

        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: { user },
        });

        return { success: true, user };
      } else {
        const errorMessage = "Invalid email or password";
        dispatch({
          type: AUTH_ACTIONS.LOGIN_FAILURE,
          payload: { error: errorMessage },
        });

        return { success: false, error: errorMessage };
      }

      // Real API implementation (commented out for now)
      // const data = await response.json()
      // if (response.ok) {
      //   const { user, token } = data
      //   tokenService.setToken(token)
      //   tokenService.setUser(user)
      //   dispatch({
      //     type: AUTH_ACTIONS.LOGIN_SUCCESS,
      //     payload: { user }
      //   })
      //   return { success: true, user }
      // } else {
      //   dispatch({
      //     type: AUTH_ACTIONS.LOGIN_FAILURE,
      //     payload: { error: data.message || 'Login failed' }
      //   })
      //   return { success: false, error: data.message || 'Login failed' }
      // }
    } catch (error) {
      const errorMessage = "Network error. Please try again.";
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: { error: errorMessage },
      });

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
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    }
  };

  // Forgot password function
  const forgotPassword = async (email) => {
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, message: data.message };
      } else {
        return {
          success: false,
          error: data.message || "Failed to send reset email",
        };
      }
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
    const updatedUser = { ...state.user, ...userData };
    tokenService.setUser(updatedUser);
    dispatch({
      type: AUTH_ACTIONS.UPDATE_USER,
      payload: userData,
    });
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Check if user has specific permission
  const hasPermission = (permission) => {
    if (!state.user || !state.user.permissions) return false;
    return state.user.permissions.includes(permission);
  };

  // Check if user has specific role
  const hasRole = (role) => {
    if (!state.user || !state.user.role) return false;
    return state.user.role === role;
  };

  const value = {
    // State
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,

    // Actions
    login,
    logout,
    forgotPassword,
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
