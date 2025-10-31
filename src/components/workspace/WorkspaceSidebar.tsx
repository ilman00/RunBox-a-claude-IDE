import {
  X,
  Settings,
  HardDrive,
  LogOut,
} from "lucide-react";
interface NavItem {
  id: string;
  icon: any;
  label: string;
  badge?: number | null;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeNav: string;
  onNavChange: (nav: string) => void;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    storageUsed: number;
    storageLimit: number;
  };
  onLogout: () => void;
  navigationItems: NavItem[];
  settingsItems: NavItem[];
}

export default function WorkspaceSidebar({
  isOpen,
  onClose,
  activeNav,
  onNavChange,
  user,
  onLogout,
  navigationItems,
  settingsItems,
}: SidebarProps) {
  const storagePercentage = (user.storageUsed / user.storageLimit) * 100;

  return (
    <aside
      className={`
        fixed lg:sticky top-0 left-0 h-screen
        w-64 bg-black/50 backdrop-blur-sm border-r border-gray-900
        transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Close button for mobile */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-900 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-gray-900">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative group">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              )}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate text-white">{user.name}</p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>

            <button className="p-1.5 hover:bg-gray-900 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
              <Settings className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
              Workspace
            </p>
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavChange(item.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                  ${activeNav === item.id
                    ? "bg-purple-600/20 text-purple-400 border border-purple-500/30 shadow-lg shadow-purple-500/10"
                    : "text-gray-400 hover:text-white hover:bg-gray-900"
                  }
                `}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium flex-1 text-left">
                  {item.label}
                </span>
                {item.badge && (
                  <span className="px-2 py-0.5 bg-purple-600 text-white text-xs rounded-full font-semibold">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-900">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
              Settings
            </p>
            {settingsItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavChange(item.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                  ${activeNav === item.id
                    ? "bg-purple-600/20 text-purple-400 border border-purple-500/30"
                    : "text-gray-400 hover:text-white hover:bg-gray-900"
                  }
                `}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium flex-1 text-left">
                  {item.label}
                </span>
                {item.badge && (
                  <span className="px-2 py-0.5 bg-red-600 text-white text-xs rounded-full font-semibold">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Storage + Logout */}
        <div className="p-4 border-t border-gray-900 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-gray-500" />
                <span className="text-gray-400">Storage</span>
              </div>
              <span className="text-gray-300 font-medium">
                {user.storageUsed}GB / {user.storageLimit}GB
              </span>
            </div>
            <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${storagePercentage > 80
                    ? "bg-gradient-to-r from-red-500 to-orange-500"
                    : "bg-gradient-to-r from-purple-500 to-blue-500"
                  }`}
                style={{ width: `${storagePercentage}%` }}
              />
            </div>
            {storagePercentage > 80 && (
              <p className="text-xs text-orange-400">
                {storagePercentage > 90
                  ? "Storage almost full!"
                  : "Storage running low"}
              </p>
            )}
            <button className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
              Upgrade Storage →
            </button>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition-all duration-200 group"
          >
            <LogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
