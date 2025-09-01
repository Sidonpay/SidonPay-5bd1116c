import React, { useRef, useState, useContext } from "react";
import {
  ShowPaymentFormContext,
  PaymentFormDetailsContext,
  PaymentFormPreviewContext
} from "../contexts/PaymentFormContext";

const CreatePaymentForm = () => {
  const paymentFormRef = useRef(null);
  const paymentInvRef = useRef(null);
  const { setShowForm } = useContext(ShowPaymentFormContext);
  const { formDetails, setFormDetails } = useContext(PaymentFormDetailsContext);
  const [isFormValid, setIsFormValid] = useState(false);
  const [check, setCheck] = useState(false);
  const [ noShow, setNoShow ] = useState(false);
  const { paymentFormPreview, setPaymentFormPreview } = useContext(PaymentFormPreviewContext);

  const handleInputChange = () => {
    setIsFormValid(paymentFormRef.current?.checkValidity() ?? false);
    setCheck(false);
  };

  const handlePreview = (e) => {
    e.preventDefault();
    if (paymentFormRef.current?.checkValidity()) {
      const data = Object.fromEntries(new FormData(paymentFormRef.current));
      setFormDetails(data);
      setPaymentFormPreview(true);
      !paymentInvRef.current.value ? setNoShow(true) : null;
    } else {
      paymentFormRef.current?.reportValidity();
      setCheck(true);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted: ", formDetails);
    setPaymentFormPreview(false);
    setShowForm(false);
  };
  return (
    <>
      <form
        action=""
        className="flex flex-col gap-4 lg:gap-5 xl:gap-6 w-full"
        onChange={handleInputChange}
        ref={paymentFormRef}
      >
        <label className="grid grid-cols-1 gap-2">
            <span className={`font-semibold text-xs text-brand_color2 ${paymentFormPreview ? "" : "hidden"} `}>Recipient Name / ID</span>
        <input
          id="recipient-name"
          className={`p-3 rounded-lg bg-base_gray bg-opacity-30 border border-base_gray text-sm placeholder:text-sm text-brand_color2 placeholder:text-secondary outline-none ${
            check
              ? "invalid:border-red-500 invalid:placeholder:text-red-500 invalid:text-red-500"
              : ""
          }`}
          type="text"
          readOnly={paymentFormPreview}
          name="recipientname"
          placeholder="Recipient Name / ID"
          required
          autoComplete="on"
        />
        </label>

        <label className="grid grid-cols-1 gap-2">
          <span className={`font-semibold text-xs text-brand_color2 ${paymentFormPreview ? "" : "hidden"} `}>Recipient Email / Phone</span>
        <input
          id="recipient-email"
          className={`p-3 rounded-lg bg-base_gray bg-opacity-30 border border-base_gray text-sm placeholder:text-sm text-brand_color2 placeholder:text-secondary outline-none ${
            check
              ? "invalid:border-red-500 invalid:placeholder:text-red-500 invalid:text-red-500"
              : ""
          }`}
          type="email"
          readOnly={paymentFormPreview}
          name="recipient-email"
          placeholder="Recipient Email / Phone"
          required
          autoComplete="on"
        />
        </label>

        <label className="grid grid-cols-1 gap-2">
          <span className={`font-semibold text-xs text-brand_color2 ${paymentFormPreview ? "" : "hidden"} `}>Payment Amount</span>
        <input
          id="payment-amount"
          className={`p-3 rounded-lg bg-base_gray bg-opacity-30 border border-base_gray text-sm placeholder:text-sm text-brand_color2 placeholder:text-secondary outline-none ${
            check
              ? "invalid:border-red-500 invalid:placeholder:text-red-500 invalid:text-red-500"
              : ""
          }`}
          type="text"
          readOnly={paymentFormPreview}
          name="payment-amount"
          placeholder="Amount (N)"
          required
        />
        </label>

        <label className="grid grid-cols-1 gap-2">
          <span className={`font-semibold text-xs text-brand_color2 ${paymentFormPreview ? "" : "hidden"} `}>Payment Reason</span>
        <input
          id="payment-reason"
          className={`p-3 rounded-lg bg-base_gray bg-opacity-30 border border-base_gray text-sm placeholder:text-sm text-brand_color2 placeholder:text-secondary outline-none ${
            check
              ? "invalid:border-red-500 invalid:placeholder:text-red-500 invalid:text-red-500"
              : ""
          }`}
          type="text"
          readOnly={paymentFormPreview}
          name="payment-reason"
          placeholder="Payment Reason"
          required
        />
        </label>

        <label className={`grid grid-cols-1 gap-2 ${noShow ? "hidden" : ""}`}>
          <span className={`font-semibold text-xs text-brand_color2 ${paymentFormPreview ? "" : "hidden"}`}>Invoice / Order ID (if applicable)</span>
        <input
          id="payment-invoice"
          ref={paymentInvRef}
          className={`p-3 rounded-lg bg-base_gray bg-opacity-30 border border-base_gray text-sm placeholder:text-sm text-brand_color2 placeholder:text-secondary outline-none  ${
            check
              ? "invalid:border-red-500 invalid:placeholder:text-red-500 invalid:text-red-500"
              : ""
          }`}
          type="text"
          readOnly={paymentFormPreview}
          name="payment-invoice"
          placeholder="Invoice / Order ID (if applicable)"
        />
        </label>

        <label className="grid grid-cols-1 gap-2">
          <span className={`font-semibold text-xs text-brand_color2 ${paymentFormPreview ? "" : "hidden"} `}>Payment Method</span>
        <input
          id="payment-method"
          className={`p-3 rounded-lg bg-base_gray bg-opacity-30 border border-base_gray text-sm placeholder:text-sm text-brand_color2 placeholder:text-secondary outline-none ${
            check
              ? "invalid:border-red-500 invalid:placeholder:text-red-500 invalid:text-red-500"
              : ""
          }`}
          type="text"
          readOnly={paymentFormPreview}
          name="payment-method"
          placeholder="Payment Method"
          required
        />
        </label>
      </form>
      <div className="flex gap-7 justify-end w-full">
        {!paymentFormPreview ? (
          <>
            <button
              onClick={() => {
                setShowForm(false);
                setCheck(false);
              }}
              className="text-sm font-bold text-brand_color2 underline"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handlePreview}
              className={`border border-base_gray w-32 py-2  p-1 rounded-[4px] outline-none disabled:cursor-not-allowed text-sm duration-300 font-bold ${
                isFormValid
                  ? "bg-brand_color1 text-white"
                  : "bg-button bg-opacity-10 text-brand_color1 text-opacity-70"
              }`}
            >
              Preview
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setPaymentFormPreview(false); setNoShow(false);
              }}
              className="text-sm font-bold text-brand_color2 underline"
            >
              Edit
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className={`border border-base_gray w-32 py-2  p-1 rounded-[4px] outline-none disabled:cursor-not-allowed text-sm duration-300 font-bold bg-brand_color1 text-white`}
            >
              Submit
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default CreatePaymentForm;
