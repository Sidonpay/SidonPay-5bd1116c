import React from 'react'
import {
  MessageSquareWarning,
  Siren,
  SquareCheck,
  SquareUserRound,
} from "lucide-react";
import PropTypes from 'prop-types';

const NotificationMessage = ({ Icon, message, time }) => {
  return (
    <div className="flex gap-2 items-start">
      <div className="p-1 rounded-lg bg-brand_color2">
        {Icon && <Icon size={16} fill="#DDE5EF" stroke="#151E31" />}
      </div>
      <div>
        <p className="text-sm text-brand_color2 overflow-hidden overflow-ellipsis max-w-48 text-nowrap">
          {message}
        </p>
        <p className="text-xs text-contrast">{time}</p>
      </div>
    </div>
  );
}

NotificationMessage.propTypes = {
    Icon: PropTypes.string,
    message: PropTypes.string,
    time: PropTypes.string
}

export default NotificationMessage
