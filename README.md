# SidonPay Admin Dashboard

Welcome to the SidonPay internal admin dashboard! This is a React-based web application for managing payments, analytics, and user data from our mobile app.

## 🎯 What is This Project?

This is an **internal admin dashboard** used by SidonPay staff to:

- View payment processing analytics
- Monitor user reviews and disputes
- Manage payouts and transactions
- Track key business metrics
- Handle customer support issues

**Important**: This is NOT a public-facing app. Only SidonPay employees have access.

## 🏗️ Project Structure

```
src/
├── components/          # All UI components (buttons, forms, layouts)
│   ├── AuthLayout.jsx      # Layout for login pages
│   ├── DashboardLayout.jsx # Main dashboard with sidebar + header
│   ├── Header.jsx          # Top navigation bar
│   ├── Sidebar.jsx         # Left navigation menu
│   ├── LoginForm.jsx       # Login form component
│   ├── LoadingSpinner.jsx  # Loading animation
│   ├── ProtectedRoute.jsx  # Route security
│   └── ...more components to be created
│
├── contexts/            # App-wide state management
│   └── AuthContext.jsx     # User authentication & permissions
│
├── pages/              # Full page components
│   ├── OverviewPage.jsx        # Analytics dashboard (landing page)
│   ├── LoginPage.jsx           # Login page
│   ├── PaymentProcessingPage.jsx # Payments processing page
│   ├── ReviewsPage.jsx         # Reviews page
│   └── ...other pages
│
├── App.jsx             # Main app with routing setup
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Git installed
- Access to SidonPay GitHub repository

### Installation

1. **Clone the repository**

```bash
git clone [repository-url]
```

2. **Install dependencies**

```bash
npm install
```

3. **Start development server**

```bash
npm run dev
```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Test Login Credentials

Since we don't have a backend yet, use these mock credentials:

**Super Admin (Full Access):**

- Email: `admin@sidonpay.com`
- Password: `password123`
- _Can create/delete admins, authenticate large transactions_

**Normal Admin (Support Access):**

- Email: `support@sidonpay.com`
- Password: `password123`
- _Can help users with issues, view dashboard data_

## Git Workflow & Branching Strategy

### Branch Structure

```
main           # Production-ready code (PROTECTED)
└── staging    # Testing environment (PROTECTED)
    └── development  # Main development branch
        └── feature/your-feature-name  # Your work here
```

### IMPORTANT RULES

**NEVER push directly to `main` or `staging`**
**ALWAYS work on feature branches**

### How to Work on Features

1. **Start from development branch**

```bash
git checkout development
git pull origin development  # Get latest changes
```

2. **Create your feature branch**

```bash
git checkout -b feature/login-ui-improvements
# or
git checkout -b feature/dashboard-metrics-cards
# or
git checkout -b fix/sidebar-navigation-bug
```

3. **Work on your code**

```bash
# Make your changes
git add .
git commit -m "Add: improved login form styling"
```

4. **Push to YOUR branch**

```bash
git push origin feature/your-feature-name
```

5. **Create Pull Request**

- Go to GitHub
- Create PR from `feature/your-branch` → `staging`
- **NEVER create PR to `main`**
- Request review from senior developer
- Wait for approval before merging

### Branch Naming Convention

```bash
feature/login-form-validation      # New features
fix/sidebar-mobile-responsive      # Bug fixes
update/dashboard-color-scheme      # Updates/improvements
refactor/auth-context-cleanup      # Code refactoring
```

## How to Work with Components

### Creating New Components

1. **Create component file in `src/components/`**
2. **Follow the pattern in existing components** (see `components/LoadingSpinner.jsx` or `components/Header.jsx`)
3. **Always add PropTypes** - check `components/ProtectedRoute.jsx` for examples
4. **Use Tailwind classes** for styling - see `components/Header.jsx` for reference

### Component Guidelines

#### DO:

- Use **PropTypes** for all props
- Keep components **small and focused**
- Use **Tailwind CSS** classes for styling
- Write **descriptive component names** (`PaymentStatusBadge` not `Badge`)
- Look at `components/LoginForm.jsx` for form patterns
- Check `components/DashboardLayout.jsx` for layout patterns

#### DON'T:

- Don't use inline styles (`style={{}}`)
- Don't make components too large (>150 lines)
- Don't hardcode values (use props)
- Don't install random npm packages without approval or proper use-case and implementation documentations
- Don't modify `contexts/AuthContext.jsx` without permission

## Creating New Pages

1. **Create page file in `src/pages/`**
2. **Follow the pattern in `pages/OverviewPage.jsx`** - see how it's structured
3. **Add route to `App.jsx`** - follow existing route patterns
4. **Add to sidebar navigation** - update `components/Sidebar.jsx`

**Reference files:**

- `pages/OverviewPage.jsx` - Complete page example
- `pages/LoginPage.jsx` - Simple page example
- `pages/PaymentProcessingPage.jsx` - Basic page structure
- `pages/ReviewsPage.jsx` - Another page example

## Authentication & User Roles

The app uses **React Context** for authentication with role-based access control.

**Reference files:**

- `contexts/AuthContext.jsx` - Complete auth system
- `components/ProtectedRoute.jsx` - Route protection examples
- `components/LoginForm.jsx` - How to use auth in forms

### User Roles & Permissions

#### **Super Admin**

- **Full dashboard access** - Can view all analytics and data
- **User management** - Can create new admin users
- **Transaction authority** - Can authenticate very large transactions
- **Admin management** - Can delete admin users
- **System control** - Complete access to all features

#### **Normal Admin**

- **Dashboard access** - Can view analytics and user data
- **Customer support** - Can check and help users fix issues
- **Limited transactions** - Can handle standard transaction issues
- **No user management** - Cannot create or delete other admins

### Using Authentication in Components

Check these files for examples:

- `components/Sidebar.jsx` - Role-based navigation
- `components/ProtectedRoute.jsx` - Permission checking
- `components/Header.jsx` - User info display

### Available Permissions:

- `view_dashboard` - Access to analytics dashboard
- `manage_users` - Create/delete admin users
- `authenticate_large_transactions` - Approve big transactions
- `handle_customer_issues` - Access customer support tools
- `view_payments` - Access payment data
- `manage_disputes` - Handle payment disputes

Remember: **Quality over speed**. It's better to create one well-built component than five broken ones.


---
