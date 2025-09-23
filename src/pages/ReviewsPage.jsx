import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { fetchReviews } from "../data/adminApi";

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchReviews().then((res) => {
      if (!mounted) return;
      if (res.success) setReviews(res.data.items || []);
      setLoading(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
      >
        <div className="px-3 md:px-6 overflow-y-auto">
          <div className="flex py-8 justify-between">
            <h1 className="font-inter text-4xl font-bold text-brand_color2">
              Reviews
            </h1>
          </div>

          {loading ? (
            <p>Loading reviews...</p>
          ) : (
            <div className="grid gap-3">
              {reviews.map((r) => (
                <div key={r.id} className="p-4 border rounded-md">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-sm font-semibold">
                        {r.user?.name} — {r.rating}★
                      </div>
                      <div className="text-xs text-mid_gray">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-xs">
                      {r.resolved ? "Resolved" : "Open"}
                    </div>
                  </div>
                  <div className="mt-2 text-sm">{r.text}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReviewsPage;
