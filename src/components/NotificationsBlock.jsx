import { MessageSquareWarning, Siren, SquareCheck,  UserRound } from "lucide-react";
import React from "react";
import NotificationMessage from "./NotificationMessage";


const NotificationsBlock = () => {
  return (
    <div className="font-inter">
      <h3 className="text-sm mb-4">Notifications</h3>
      <div className="flex flex-col gap-4">
        <NotificationMessage
          Icon={SquareCheck}
          message="Payment scuccessful to Fola"
          time="Just now"
        />
        <NotificationMessage
          Icon={UserRound}
          message="New users registered."
          time="59 minutes ago"
        />
        <NotificationMessage
          Icon={Siren}
          message="Maintenance Notice"
          time="12 hours ago"
        />
        <NotificationMessage
          Icon={MessageSquareWarning}
          message="Refund requested from Samuel"
          time="Today, 11:59 AM"
        />
      </div>
    </div>
  );
};

export default NotificationsBlock;
