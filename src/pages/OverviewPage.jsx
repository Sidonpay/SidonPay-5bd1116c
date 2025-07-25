import { ChevronDown } from "lucide-react";

function OverviewPage() {
  return (
    <div className="flex py-6 h-screen">
      <div className="px-6 overflow-y-auto">
        {/* Page Header */}
        <div className="flex justify-between">
          <h1 className="text-sm font-bold text-brand_color2">Overview</h1>
          <button className="text-xs flex items-center gap-1">
            Today
            <ChevronDown size={12} />
          </button>
        </div>
        {/* Top Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Payments Processing Card */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-sm text-gray-500">Payments processing</h3>
            <p className="text-3xl font-bold">7,265</p>
            <span className="text-green-500 text-sm">+1.01%</span>
          </div>

          {/* Reviews Card */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-sm text-gray-500">Reviews</h3>
            <p className="text-3xl font-bold">3,671</p>
            <span className="text-red-500 text-sm">-0.83%</span>
          </div>

          {/* Disputes Card */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-sm text-gray-500">Disputes</h3>
            <p className="text-3xl font-bold">156</p>
            <span className="text-green-500 text-sm">+16.03%</span>
          </div>

          {/* Payouts Card */}
          <div className="bg-white p-6 rounded-lg border">
            <h3 className="text-sm text-gray-500">Payouts</h3>
            <p className="text-3xl font-bold">2,318</p>
            <span className="text-green-500 text-sm">+6.08%</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 p-6">
            {/* Main Line Chart */}
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Total Users</h3>
                <div className="flex space-x-4 text-sm">
                  <span>Total Payouts</span>
                  <span>Reviews Status</span>
                  <span>This year</span>
                  <span>Last year</span>
                </div>
              </div>
              <div className="h-64 bg-gray-50 rounded">
                {/* Chart placeholder */}
                <p className="text-center pt-24 text-gray-500">
                  Line Chart (Jan-Jul)
                </p>
              </div>
            </div>

            {/* Traffic Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Traffic by Location */}
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">
                  Traffic by Location
                </h3>
                <div className="h-48 bg-gray-50 rounded">
                  <p className="text-center pt-20 text-gray-500">Pie Chart</p>
                </div>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Lagos</span>
                    <span>52.1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ibadan</span>
                    <span>22.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Abuja</span>
                    <span>14.7%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Other</span>
                    <span>10.4%</span>
                  </div>
                </div>
              </div>

              {/* Traffic by Device */}
              <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">
                  Traffic by Device
                </h3>
                <div className="h-48 bg-gray-50 rounded">
                  <p className="text-center pt-20 text-gray-500">Bar Chart</p>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>Linux, Mac, iOS, Windows, Android, Other</p>
                </div>
              </div>
            </div>

            {/* Sales Report */}
            <div className="bg-white p-6 rounded-lg border">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Sales Report</h3>
                <button className="text-sm text-blue-600">View →</button>
              </div>
              <div className="h-48 bg-gray-50 rounded">
                <p className="text-center pt-20 text-gray-500">
                  Monthly Bar Chart
                </p>
              </div>
            </div>

            {/* Traffic by Website */}
            <div className="bg-white p-6 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Traffic by Website</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Google</span>
                  <div className="w-32 bg-gray-200 rounded h-2">
                    <div
                      className="bg-blue-500 h-2 rounded"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>YouTube</span>
                  <div className="w-32 bg-gray-200 rounded h-2">
                    <div
                      className="bg-red-500 h-2 rounded"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Instagram</span>
                  <div className="w-32 bg-gray-200 rounded h-2">
                    <div
                      className="bg-pink-500 h-2 rounded"
                      style={{ width: "40%" }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>TikTok</span>
                  <div className="w-32 bg-gray-200 rounded h-2">
                    <div
                      className="bg-black h-2 rounded"
                      style={{ width: "35%" }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Facebook</span>
                  <div className="w-32 bg-gray-200 rounded h-2">
                    <div
                      className="bg-blue-600 h-2 rounded"
                      style={{ width: "30%" }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Twitter</span>
                  <div className="w-32 bg-gray-200 rounded h-2">
                    <div
                      className="bg-blue-400 h-2 rounded"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Notifications & Team */}
          <div className="p-6"></div>
        </div>
      </div>
      <div className="border-l pl-6">
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
