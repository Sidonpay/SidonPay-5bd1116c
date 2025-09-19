import React, { useContext } from 'react'
import PaymentDetail from './PaymentDetail';
import PropTypes from 'prop-types';
import { ArrowLeft, ArrowRight, Ellipsis } from 'lucide-react';
import { PaymentReceiptContext, ShowReceiptContext } from '../contexts/PaymentReceiptContext';

const PaymentsTable = ({paymentType, onHide, onDelete}) => {
  const { setPaymentReceipt } = useContext(PaymentReceiptContext)
  const { setShowReceipt } = useContext(ShowReceiptContext)

  const handleDescriptionClick = (item) => {
    setPaymentReceipt(item)
    setShowReceipt(true)
  };

  return (
    <>
      <table className="text-xs/10 min-w-full table-auto mb-1">
        <thead>
          <tr className="text-mid_gray text-left">
            <th className="font-semibold hidden">
              <input type="checkbox" name="checkbox" id="checkbox" />
            </th>
            <th className="font-semibold px-3 md:px-4 lg:w-10">Amount</th>
            <th className="font-semibold text-center px-3 md:px-4">Status</th>
            <th className="font-semibold px-3 md:px-4">Description</th>
            <th className="font-semibold px-3 md:px-4">Customer</th>
            <th className="font-semibold px-3 md:px-4">Date</th>
            <th className="font-semibold px-3 md:px-4">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {paymentType.map((item, index) => (
            <PaymentDetail
              key={index}
              amount={item.amount}
              status={item.status}
              detailsClick={()=>(handleDescriptionClick(item))}
              desc={item.desc}
              customer={item.customer}
              date={item.date}
              onHide={() => onHide && onHide(item, index)}
              onDelete={() => onDelete && onDelete(item, index)}
            />
          ))}
        </tbody>
      </table>

      
    </>
  );
}

PaymentsTable.propTypes = {
    paymentsTable: PropTypes.array
}

export default PaymentsTable
