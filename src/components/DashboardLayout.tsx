import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { sidebarItems } from '../constants/constants';
import { MessageCircle, Settings, Search, Bell } from 'lucide-react';

import ThemeToggle from './ThemeToggle';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * DashboardLayout is the main layout component for the dashboard.
 * It includes the header, sidebar, and main content area.
 *
 * @component
 * @param {DashboardLayoutProps} props - Props passed to the layout component.
 * @param {React.ReactNode} props.children - The page content to render inside the layout.
 * @returns {JSX.Element} The rendered dashboard layout.
 */
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();

  /**
   * Checks if the given path is currently active (matches the current location path).
   *
   * @param {string} path - The path to compare with the current location.
   * @returns {boolean} True if the path is active, otherwise false.
   */
  const isActive = (path: string): boolean => {
    if (path === '/') {
      // Active if it's exactly "/" (Overview) or starts with "/course" (Courses)
      return location.pathname === '/' || location.pathname.startsWith('/course');
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Search */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-primary-foreground rounded-full"></div>
              </div>
              <span className="text-xl font-semibold">Omni.</span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search or type"
                className="bg-muted border border-input rounded-lg pl-10 pr-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Header Icons */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <div className="relative">
              <Bell className="w-6 h-6 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs"></span>
            </div>
            <div className="relative">
              <MessageCircle className="w-6 h-6 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs"></span>
            </div>
            <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card min-h-screen p-6 border-r border-border">
          <nav className="space-y-2">
            <div className="text-muted-foreground text-sm font-medium mb-4">Menu</div>
            {sidebarItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Account Section */}
          <div className="mt-16">
            <div className="text-muted-foreground text-sm font-medium mb-4">Account</div>

            <Link
              to="/messages"
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Messages</span>
              <span className="ml-auto bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full">5</span>
            </Link>

            <Link
              to="/settings"
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === '/settings'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </div>

          {/* Invite Section */}
          <div className="mt-16">
            <div className="bg-muted rounded-lg p-4 text-center">
              <div className="text-4xl mb-2">📚</div>
              <div className="text-foreground font-medium mb-2">Invite Friend</div>
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm hover:bg-primary/90">
                Get The link
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
