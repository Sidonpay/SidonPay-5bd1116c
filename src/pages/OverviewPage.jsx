import { ChevronDown } from "lucide-react";
import MetricsCard from "../components/MetricsCard";
import OverviewChart from "../components/OverviewChart";
import WebsiteTrafficChart from "../components/WebsiteTrafficChart";
import LocationTrafficChart from "../components/LocationTrafficChart";

function OverviewPage() {
  return (
    <div className="flex max-h-screen pb-12">
      <div className="px-6 overflow-y-auto items-stretch flex-1">
        <div className="max-w-[1280px] mx-auto">
          {/* Page Header */}
          <div className="flex py-8 justify-between">
            <h1 className="text-sm font-bold text-brand_color2">Overview</h1>
            <button className="text-xs flex items-center gap-1">
              Today
              <ChevronDown size={12} />
            </button>
          </div>
          {/* Top Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12">
            <MetricsCard
              bgColor="bg-base_gray bg-opacity-40"
              title="Payments processing"
              value={7265}
              percent={11.01}
              slope="up"
            />
            <MetricsCard
              bgColor="bg-neutral-200"
              title="Reviews"
              value={3671}
              percent={0.03}
              slope="down"
            />
            <MetricsCard
              bgColor="bg-button bg-opacity-10"
              title="Payments processing"
              value={156}
              percent={15.03}
              slope="up"
            />
            <MetricsCard
              bgColor="bg-gray-200"
              title="Payments processing"
              value={2318}
              percent={6.08}
              slope="up"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-2 xl:grid-cols-4 gap-6 py-8">
            {/* Main Line Chart */}
            <div className="bg-button bg-opacity-10 col-span-1 md:col-span-5 lg:col-span-2 xl:col-span-3 p-6 rounded-2xl border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Total Users</h3>
                <div className="flex space-x-4 text-sm">
                  <span>Total Payouts</span>
                  <span>Reviews Status</span>
                  <span>This year</span>
                  <span>Last year</span>
                </div>
              </div>
              <div className="h-64">
                {/* Chart placeholder */}

                <OverviewChart />
              </div>
            </div>

            {/* Website Chart */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1 p-6 bg-white">
              <h3 className="text-lg font-semibold mb-4">Traffic by Website</h3>
              <div className="h-64">
              <WebsiteTrafficChart />
              </div>
            </div>

            {/* Traffic by Location */}
            <div className="col-span-1 md:col-span-3 lg:col-span-1 xl:col-span-2 bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">
                Traffic by Location
              </h3>
              <div className="flex h-64">
                <LocationTrafficChart />
               
              </div>
            </div>

            {/* Traffic by Device */}
            <div className="bg-white col-span-1 md:col-span-5 lg:col-span-2 xl:col-span-2 p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Traffic by Device</h3>
              <div className="h-48 bg-gray-50 rounded">
                <p className="text-center pt-20 text-gray-500">Bar Chart</p>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>Linux, Mac, iOS, Windows, Android, Other</p>
              </div>
            </div>
            {/* Traffic Charts Row */}
            <div className="col-span-1 md:col-span-5 lg:col-span-2 xl:col-span-4"></div>
          </div>
        </div>
      </div>
      {/* Right Column - Placeholder for now */}
      <div className="hidden lgf:block border-l pl-6 max-w-52">
        {/* Dashboard developer left this section for future implementation */}
        {/* Notifications */}
        <div className="">
          <h3 className="text-lg font-semibold mb-4">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-medium">Payment Successful</p>
                <p className="text-xs text-gray-500">2 min ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-medium">New users registered</p>
                <p className="text-xs text-gray-500">5 min ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-medium">Maintenance Notice</p>
                <p className="text-xs text-gray-500">10 min ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm font-medium">
                  Refund Requested from Sam...
                </p>
                <p className="text-xs text-gray-500">15 min ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="">
          <h3 className="text-lg font-semibold mb-4">Team members</h3>
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
    </div>
  );
}

export default OverviewPage;
