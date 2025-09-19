import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "motion/react";
import { fetchDisputes } from '../data/adminApi';

const DisputesPage = () => {
  const [disputes, setDisputes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchDisputes().then(res => {
      if(!mounted) return;
      if(res.success) setDisputes(res.data.items || []);
      setLoading(false);
    });
    return () => { mounted = false };
  },[]);

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
              Disputes
            </h1>
          </div>

          {loading ? (
            <p>Loading disputes...</p>
          ) : (
            <div className="grid gap-3">
              {disputes.map(d => (
                <div key={d.id} className="p-4 border rounded-md">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-sm font-semibold">{d.id} — {d.reason}</div>
                      <div className="text-xs text-mid_gray">{d.customer?.name} • {new Date(d.createdAt).toLocaleString()}</div>
                    </div>
                    <div className="text-sm">{d.status}</div>
                  </div>
                  <div className="mt-2 text-xs">Transaction: {d.transactionId} • Amount: ₦{(d.amount/100).toLocaleString()}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default DisputesPage
