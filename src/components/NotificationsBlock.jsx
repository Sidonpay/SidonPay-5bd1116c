import { MessageSquareWarning, Siren, SquareCheck,  UserRound } from "lucide-react";
import React, { useContext } from "react";
import NotificationMessage from "./NotificationMessage";
import NotificationContext from "../contexts/NotificationContext";


const NotificationsBlock = () => {

  const { setNotify } = useContext(NotificationContext)
  return (
    <div className="font-inter flex flex-col gap-8">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm">Notifications</h3>
          <button onClick={()=>setNotify(false)} className="text-xs text-contrast border-b">Close</button>
        </div>
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

      {/* Team Members */}
      <div className="">
        <h3 className="text-sm mb-4">Team members</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">KA</span>
            </div>
            <span className="text-sm">Kunle Adeyeye</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">BA</span>
            </div>
            <span className="text-sm">Bola Adedapo</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">SA</span>
            </div>
            <span className="text-sm">Shola Adeniyi</span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">LO</span>
            </div>
            <span className="text-sm">Lati Olaoye</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsBlock;
