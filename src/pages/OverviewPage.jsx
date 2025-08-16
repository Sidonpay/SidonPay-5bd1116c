import { AnimatePresence, motion } from "motion/react";

import { ChevronDown } from "lucide-react";
import MetricsCard from "../components/MetricsCard";
import WebsiteTrafficChart from "../components/WebsiteTrafficChart";
import LocationTrafficChart from "../components/LocationTrafficChart";
import DeviceTrafficChart from "../components/DeviceTrafficChart";
import SalesReportChart from "../components/SalesReportChart";
import NotificationsBlock from "../components/NotificationsBlock";
import { useContext, useState } from "react";
import SidebarContext from "../contexts/SidebarContext";
import NotificationContext from "../contexts/NotificationContext";
import { overviewChartsTabs, overviewChartsTabContent } from "../components/OverviewChartsTabs";


function OverviewPage() {
  const { open } = useContext(SidebarContext);
  const { notify } = useContext(NotificationContext);
  const [activeChartTab, setActiveChartTab] = useState("tab1")

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        className="flex max-h-screen pb-24"
      >
        <div className="px-3 md:px-6 items-stretch flex-1">
          <div className="">
            {/* Page Header */}
            <div className="flex py-8 justify-between">
              <h1 className="text-sm font-bold text-brand_color2">Overview</h1>
              <button className="text-xs flex items-center gap-1">
                Today
                <ChevronDown size={12} />
              </button>
            </div>
            {/* Top Metrics Cards */}
            <div
              className={`grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 ${
                open ? "xl:gap-6" : "xl:gap-8"
              }`}
            >
              <MetricsCard
                bgColor="bg-base_gray bg-opacity-40"
                title="Payments"
                value={7265}
                percent={11.01}
                rising={true}
              />
              <MetricsCard
                bgColor="bg-neutral-200"
                title="Reviews"
                value={3671}
                percent={0.03}
                rising={false}
              />
              <MetricsCard
                bgColor="bg-button bg-opacity-10"
                title="Disputes"
                value={156}
                percent={15.03}
                rising={true}
              />
              <MetricsCard
                bgColor="bg-gray-200"
                title="Payouts"
                value={2318}
                percent={6.08}
                rising={true}
              />
            </div>

            {/* Main Content Grid */}
            <div
              className={`grid grid-cols-1 md:grid-cols-5 lg:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-6 ${
                open ? "" : "lg:gap-8"
              } py-8`}
            >
              {/* Main Line Chart */}
              <div className="bg-button bg-opacity-10 col-span-1 md:col-span-5 lg:col-span-2 xl:col-span-3 p-4 lg:p-6 rounded-2xl">
                {/* <div className="flex items-center mb-4">
                <h3 className="text-sm font-semibold">Total Users</h3>
                <div className="flex space-x-2 text-sm">
                  <span>Total Payouts</span>
                  <span>Reviews Status</span>
                  <span>This year</span>
                  <span>Last year</span>
                </div>
              </div> */}
                <div className="mb-4">
                  {overviewChartsTabs.map((tab) => (
                    <button
                      key={tab.id}
                      className={`text-sm px-1 ${
                        activeChartTab === tab.id ? "font-semibold" : ""
                      }`}
                      onClick={() => setActiveChartTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center h-64">
                  {overviewChartsTabContent[activeChartTab]}
                </div>
              </div>

              {/* Website Chart */}
              <div
                className={`col-span-1 ${
                  notify ? "md:col-span-5" : "md:col-span-2"
                }  lg:col-span-1 p-4 lg:p-6 bg-button bg-opacity-10 rounded-2xl`}
              >
                <h3 className="text-sm font-semibold mb-4">
                  Traffic by Website
                </h3>
                <div className="flex items-center h-64">
                  <WebsiteTrafficChart />
                </div>
              </div>

              {/* Traffic by Location */}
              <div
                className={`col-span-1 ${
                  notify ? "md:col-span-5" : "md:col-span-3"
                } lg:col-span-1 xl:col-span-2 bg-base_gray bg-opacity-40 p-4 lg:p-6 rounded-2xl`}
              >
                <h3 className="text-sm font-semibold mb-4">
                  Traffic by Location
                </h3>
                <div className="flex h-64">
                  <LocationTrafficChart />
                </div>
              </div>

              {/* Traffic by Device */}
              <div className="bg-neutral-100 col-span-1 md:col-span-5 lg:col-span-2 xl:col-span-2 p-4 lg:p-6 rounded-2xl">
                <h3 className="text-sm font-semibold mb-4">
                  Traffic by Device
                </h3>
                <div className="h-64">
                  <DeviceTrafficChart />
                </div>
              </div>
              {/* Sales Charts Row */}
              <div className="col-span-1 md:col-span-5 lg:col-span-2 xl:col-span-4 p-2 lg:p-6">
                <div className="flex justify-between mb-4">
                  <h1 className="text-sm font-bold text-brand_color2">
                    Sales Report
                  </h1>
                  <button className="text-xs flex items-center gap-1 border border-black rounded-full px-2 py-1">
                    Month
                    <ChevronDown size={12} />
                  </button>
                </div>
                <div className="h-64">
                  <SalesReportChart />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Right Column - Placeholder for now */}
        <div
          className={`hidden md:flex transition-all duration-300 ${
            notify ? "w-fit pl-4 pr-2" : "w-0 pl-0 pr-0"
          } overflow-hidden flex-col gap-8 border-l py-8`}
        >
          {/* Notifications */}
          <NotificationsBlock />
        </div>

        {/* Hidden Notifications for Mobile */}
        <div
          className={`flex md:hidden absolute top-0 bg-base_white flex-col gap-8 border-l pl-4 pr-2 py-8 rounded-b-lg z-20 ${
            notify ? "right-0" : "-right-full"
          } `}
        >
          <NotificationsBlock />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default OverviewPage;
