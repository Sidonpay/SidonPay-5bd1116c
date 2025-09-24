import React, { useContext, useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Ellipsis,
  Funnel,
  Plus,
} from "lucide-react";
import { PaymentsTabs } from "../components/PaymentsTabs";
import ReceiptModal from "../components/ReceiptModal";
import ConfirmModal from "../components/ConfirmModal";
import { Link } from "react-router-dom";
import CurrentPage from "../contexts/CurrentPageContext";
import { fetchPayments } from "../data/adminApi";
import PaymentsTable from "../components/PaymentsTable";

const PaymentProcessingPage = () => {
  const { setPage } = useContext(CurrentPage);
  const [activePaymentsTab, setActivePaymentsTab] = useState("successful_tab");
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const tabStatusMap = {
    successful_tab: "SUCCEEDED",
    refunded_tab: "REFUNDED",
    uncaptured_tab: "UNCAPTURED",
    all_tab: "ALL",
  };

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const status = tabStatusMap[activePaymentsTab];
      const resp = await fetchPayments({ status, page: 1, perPage: 50 });
      if (!mounted) return;
      if (resp?.success) {
        // map data shape to PaymentsTable expected props
        const items = resp.data.items.map((it) => ({
          amount: Math.round((it.amountKobo || 0) / 100),
          status:
            it.status === "SUCCEEDED"
              ? "Successful"
              : it.status === "REFUNDED"
              ? "Refunded"
              : "Uncaptured",
          desc: it.description || it.narration || it.reference || it.id,
          customer: it.customerName || it.senderName || "",
          date: new Date(it.createdAt).toLocaleString(),
          // keep raw item for details
          __raw: it,
        }));
        setPayments(items);
      } else {
        setPayments([]);
      }
      setLoading(false);
    }
    load();
    return () => {
      mounted = false;
    };
  }, [activePaymentsTab]);

  // persist hidden/deleted ids in localStorage
  const HIDDEN_KEY = "SIDONPAY_HIDDEN_PAYMENTS";
  const DELETED_KEY = "SIDONPAY_DELETED_PAYMENTS";

  useEffect(() => {
    // on load attach hidden/deleted filters if present
    const hiddenRaw = localStorage.getItem(HIDDEN_KEY);
    const deletedRaw = localStorage.getItem(DELETED_KEY);
    const hidden = hiddenRaw ? JSON.parse(hiddenRaw) : [];
    const deleted = deletedRaw ? JSON.parse(deletedRaw) : [];
    if ((hidden.length || deleted.length) && payments.length) {
      setPayments((p) =>
        p.filter(
          (it) =>
            !hidden.includes(it.__raw?.id) && !deleted.includes(it.__raw?.id)
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payments.length]);

  const persistList = (key, arr) =>
    localStorage.setItem(key, JSON.stringify(arr));

  const handleHide = (item) => {
    const id = item.__raw?.id || item.id;
    setPayments((p) => p.filter((it) => (it.__raw?.id || it.id) !== id));
    const prev = JSON.parse(localStorage.getItem(HIDDEN_KEY) || "[]");
    const next = Array.from(new Set([...prev, id]));
    persistList(HIDDEN_KEY, next);
  };

  const handleDelete = (item) => {
    // show confirmation modal before deleting
    setDeleteTarget(item);
    setShowConfirm(true);
  };

  // confirm modal state
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // toasts
  const [toasts, setToasts] = useState([]);

  const pushToast = (content, options = {}) => {
    const id = Date.now() + Math.random();
    const t = { id, content, ...options };
    setToasts((ts) => [t, ...ts]);
    if (options.autoDismiss !== false) {
      setTimeout(() => setToasts((ts) => ts.filter((x) => x.id !== id)), 6000);
    }
    return id;
  };

  const performDelete = async (item) => {
    const id = item.__raw?.id || item.id;
    try {
      const resp = await fetch(`/api/payments/${id}`, { method: "DELETE" });
      const json = await resp.json();
      if (!json?.success) throw new Error(json?.error || "Delete failed");
      // remove locally
      setPayments((p) => p.filter((it) => (it.__raw?.id || it.id) !== id));
      const prev = JSON.parse(localStorage.getItem(DELETED_KEY) || "[]");
      const next = Array.from(new Set([...prev, id]));
      persistList(DELETED_KEY, next);

      // show themed undo toast
      pushToast(
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-button bg-opacity-20">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2v2"
                stroke="#151E31"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <div className="text-sm font-semibold text-brand_color2">
              Payment deleted
            </div>
            <button
              className="text-xs text-secondary underline"
              onClick={() => {
                // undo locally: re-add item to payments
                setPayments((p) => [item, ...p]);
                const deletedPrev = JSON.parse(
                  localStorage.getItem(DELETED_KEY) || "[]"
                ).filter((x) => x !== id);
                persistList(DELETED_KEY, deletedPrev);
              }}
            >
              Undo
            </button>
          </div>
        </div>,
        { autoDismiss: true }
      );
    } catch (err) {
      pushToast(
        <div className="text-sm text-red-600">
          Failed to delete: {String(err)}
        </div>,
        { autoDismiss: true }
      );
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className="px-3 md:px-6"
      >
        <div className="flex py-8 justify-between items-center">
          <h1 className="font-inter text-xl md:text-2xl lg:text-3xl font-bold text-brand_color2">
            Payment Processing
          </h1>
          <div className="flex gap-1.5 lg:gap-3 xl:gap-6 text-xs">
            <button
              className={`flex items-center px-3 py-1.5 gap-1 border border-light-gray2 rounded-md text-secondary`}
            >
              <Funnel fill="grey" size={14} />
              <span className="hidden md:block">Filter</span>
            </button>
            <button
              className={`flex items-center px-3 gap-1 border border-light-gray2 rounded-md text-secondary`}
            >
              <ArrowUp size={14} />
              <span className="hidden md:block">Export</span>
            </button>
            <Link
              to="/create-payment"
              className={`flex items-center px-3 gap-1 md:border md:border-light-gray2 bg-button bg-opacity-10 rounded-md hover:bg-button_primary hover:bg-opacity-100 text-brand_color1 font-bold hover:text-white duration-300`}
              onClick={() => {
                setPage("Create payment");
              }}
            >
              <Plus size={14} />
              <span className="hidden md:block">Create payment</span>
            </Link>
          </div>
        </div>

        <div className="min-w-0 w-full max-w-full mb-8">
          <div className="flex gap-4 md:gap-8 lg:gap-10 text-brand_color2 border-b mb-4">
            {PaymentsTabs.map((tab) => (
              <button
                key={tab.id}
                className={`text-sm pb-2 border-b-2 duration-300 ${
                  activePaymentsTab === tab.id
                    ? "font-bold border-secondary"
                    : "border-base_gray"
                }`}
                onClick={() => setActivePaymentsTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="w-full max-w-full overflow-x-auto">
            {loading ? (
              <div className="p-6 text-center">Loading...</div>
            ) : (
              <PaymentsTable
                paymentType={payments}
                onHide={handleHide}
                onDelete={handleDelete}
              />
            )}
          </div>

          <div className="sticky bottom-0 left-0 bg-base_white flex justify-between items-center px-2 pt-4 pb-2 border-t w-full text-xs">
            <button className="flex md:w-24 justify-center items-center gap-2 px-2 py-1 border rounded-lg group">
              <ArrowLeft
                size={14}
                className="group-hover:-translate-x-0.5 duration-300"
              />
              <span className="hidden md:block">Previous</span>
            </button>
            <div className="flex">
              <div className="w-10 h-10 flex justify-center items-center cursor-pointer rounded-lg bg-button bg-opacity-10">
                1
              </div>
              <div className="w-10 h-10 flex justify-center items-center cursor-pointer rounded-lg">
                2
              </div>
              <div className="hidden w-10 h-10 md:flex justify-center items-center cursor-pointer rounded-lg">
                3
              </div>
              <div className="w-10 h-10 flex justify-center items-center rounded-lg">
                <Ellipsis size={14} />
              </div>
              <div className="w-10 h-10 flex justify-center items-center cursor-pointer rounded-lg">
                6
              </div>
              <div className="w-10 h-10 hidden md:flex justify-center items-center cursor-pointer rounded-lg">
                7
              </div>
              <div className="w-10 h-10 flex justify-center items-center cursor-pointer rounded-lg">
                8
              </div>
            </div>
            <button className="flex md:w-24 justify-center items-center gap-2 px-2 py-1 border rounded-lg group">
              <span className="hidden md:block">Next</span>
              <ArrowRight
                className="group-hover:translate-x-0.5 duration-300"
                size={14}
              />
            </button>
          </div>
        </div>

        <div>
          <ReceiptModal />
        </div>
        <ConfirmModal
          visible={showConfirm}
          title="Delete payment"
          message="Are you sure you want to delete this payment? This action cannot be undone."
          onCancel={() => {
            setShowConfirm(false);
            setDeleteTarget(null);
          }}
          onConfirm={() => {
            setShowConfirm(false);
            performDelete(deleteTarget);
            setDeleteTarget(null);
          }}
        />

        {/* Toasts */}
        <div className="fixed top-6 right-6 flex flex-col gap-3 z-50">
          {toasts.map((t) => (
            <div key={t.id} className="bg-white border p-3 rounded shadow-md">
              {t.content}
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PaymentProcessingPage;
