# CreatePaymentPage.jsx — Documentation of Changes

## 1. Context Integration
- Imported and consumed two contexts:
  - **ShowPaymentFormContext**: provides `showForm` (boolean) and `setShowForm` to toggle form visibility.  
  - **PaymentFormPreviewContext**: provides `paymentFormPreview` (boolean) to determine whether the form is in preview mode.

## 2. Animations
- Page wrapped in `AnimatePresence` and `motion.div` for fade/scale transitions.  
- Trigger box animates in from `x: -30, y: -100`.  
- Form container animates in from `x: 30`.

## 3. Conditional Rendering
- When `showForm === false`:  
  - Render a dashed-border trigger box with instructions and a plus button (`setShowForm(true)` on click).  
- When `showForm === true`:  
  - Render `CreatePaymentForm` inside a motion container.

## 4. Dynamic Styling
- When `paymentFormPreview === true`:  
  - Form container adds:  
    ```css
    bg-base_gray bg-opacity-30 border-base_gray py-8
    ```
- When `paymentFormPreview === false`:  
  - Uses default container styling.
