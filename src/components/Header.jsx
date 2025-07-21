import { useAuth } from "../contexts/AuthContext";

function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Page title area */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
          <p className="text-sm text-gray-500">Welcome back, {user?.name}</p>
        </div>

        {/* Header actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <span className="sr-only">Notifications</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-5 5v-5zM12 3a4 4 0 014 4v6l2 2v1H6v-1l2-2V7a4 4 0 014-4z"
              />
            </svg>
          </button>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* User profile */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {user?.name?.charAt(0) || "U"}
              </span>
            </div>
            <span className="text-sm font-medium text-gray-700">
              {user?.name}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
