# SidonPay – Developer Change Summary

## Features & Changes Added (Current Push)

### 1. Create Admin Profile Flow
- **CreateAdminProfileForm.jsx**
  - Added a form for super admins to create new admin accounts.
  - Includes fields for first name, last name, email, and password.
  - "Auto generate" button for secure password creation.
  - Checkbox for agreeing to Terms of Service.
  - Shows a loading spinner while submitting.
  - After successful creation, displays a `VerifyLinkSent` confirmation screen.
  - Uses localStorage to persist the verify screen after refresh, so users don’t lose progress if they reload.

- **VerifyLinkSent.jsx**
  - Confirmation screen shown after creating an admin.
  - Masks the email address for privacy.
  - Uses the reusable `AuthButton` for consistent UI.
  - "Create More Profile" resets the form for another entry.
  - "Back to Dashboard" navigates to the main dashboard.

---

### 2. Temporary Password Change Flow
- **ChangeTempPassword.jsx**
  - Lets users change their temporary password after first login or when required.
  - Reads the temporary password and token from the URL query parameters (e.g., `/change-temp-password?temp=abc123&token=xyz`).
  - Displays the temp password in a read-only input with a show/hide toggle (using the EyeIcon).
  - Uses the reusable `InputField` and `AuthButton` components for consistent UI.
  - On submit, simulates an API call and then navigates to `/reset-password/:token` for the user to set a new password.
  - Shows a loading spinner on the submit button for better feedback.

---

### 3. Routing & Page Structure
- **App.jsx**
  - Ensured routes for `/create-admin`, `/change-temp-password`, and `/reset-password/:token` are present and protected as needed.
  - All authentication-related pages use `AuthLayout` for a consistent look and feel.

---

### 4. Reusable Components
- All new features use existing reusable components:
  - `InputField`, `AuthButton`, `LoadingSpinner`, `EyeIcon`, etc.

---

## How to Test

- **Create Admin:**  
  Log in as a super admin and visit `/create-admin` to create a new admin profile.
- **Temp Password Change:**  
  Visit `/change-temp-password?temp=YOUR_TEMP_PASSWORD&token=YOUR_TOKEN` to test the temp password change flow.
- **Verify Screen Persistence:**  
  After creating an admin, refresh the page to confirm the verify screen persists until you choose to create more or go back to dashboard.

---

**Note:**  
No changes were made to the main `README.md` file.  
All changes follow the project’s component and workflow