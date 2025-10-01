import { useState } from 'react';
import {
    Folder,
    Star,
    Users,
    Archive,
    Settings,
    Bell,
    Menu,
} from 'lucide-react';
import WorkspaceSidebar from '../components/workspace/WorkspaceSidebar';

// Types for API integration
interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    storageUsed: number;
    storageLimit: number;
}

export default function WorkspaceLayout() {
    // State for mobile sidebar toggle
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeNav, setActiveNav] = useState('projects');

    // Mock user data - Replace with API call
    const [user] = useState<User>({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        storageUsed: 2.4,
        storageLimit: 10
    });

    // API Integration Ready - Fetch user data
    // useEffect(() => {
    //   const fetchUserData = async () => {
    //     const response = await fetch('/api/user');
    //     const data = await response.json();
    //     setUser(data);
    //   };
    //   fetchUserData();
    // }, []);

    const handleLogout = async () => {
        // TODO: Implement logout API call
        // await fetch('/api/auth/logout', { method: 'POST' });
        // navigate('/login');
        console.log('Logging out...');
    };

    // const storagePercentage = (user.storageUsed / user.storageLimit) * 100;

    const navigationItems = [
        { id: 'projects', icon: Folder, label: 'Projects', badge: null },
        { id: 'starred', icon: Star, label: 'Starred', badge: null },
        { id: 'shared', icon: Users, label: 'Shared', badge: 2 },
        { id: 'archived', icon: Archive, label: 'Archived', badge: null },
    ];

    const settingsItems = [
        { id: 'settings', icon: Settings, label: 'Settings' },
        { id: 'notifications', icon: Bell, label: 'Notifications', badge: 3 },
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Animated Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10" />
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10 animate-pulse" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative flex z-10">
                {/* Sidebar */}
                <WorkspaceSidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    activeNav={activeNav}
                    onNavChange={setActiveNav}
                    user={user}
                    onLogout={handleLogout}
                    navigationItems={navigationItems}
                    settingsItems={settingsItems}
                />

                {/* Mobile Sidebar Overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Main Content Area */}
                <main className="flex-1 min-h-screen">
                    {/* Mobile Header with Menu Toggle */}
                    <div className="lg:hidden sticky top-0 z-20 bg-black/80 backdrop-blur-sm border-b border-gray-900 p-4">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="p-2 hover:bg-gray-900 rounded-lg transition-colors"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <h1 className="text-lg font-bold">Workspace</h1>
                            <div className="w-10" />
                        </div>
                    </div>

                    {/* Content Container */}
                    <div className="p-6">
                        {/* Placeholder for next chunks */}
                        <div className="flex items-center justify-center h-96 border-2 border-dashed border-gray-800 rounded-xl">
                            <div className="text-center">
                                <Folder className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                                <h2 className="text-xl font-semibold text-gray-600 mb-2">
                                    Main Content Area
                                </h2>
                                <p className="text-gray-500">
                                    Header, filters, and project cards will go here in the next chunks
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}