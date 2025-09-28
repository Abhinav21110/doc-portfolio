import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, User, Award, MessageCircle, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const navigationItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/about', label: 'About', icon: User },
  { path: '/achievements', label: 'Achievements', icon: Award },
  { path: '/contact', label: 'Contact', icon: MessageCircle },
];

const FloatingNavbar = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="fixed top-6 right-6 z-50">
      <div className="bg-card/90 backdrop-blur-lg border border-border rounded-2xl shadow-strong p-2">
        <div className="flex items-center gap-2">
          {/* Navigation Items */}
          <div className="flex items-center gap-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`relative p-3 rounded-xl transition-all duration-300 group hover:scale-110 ${
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-medium' 
                      : 'hover:bg-accent text-muted-foreground hover:text-foreground'
                  }`}
                  title={item.label}
                >
                  <IconComponent className="w-5 h-5" />
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full right-1/2 transform translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    {item.label}
                  </div>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl bg-primary/20 animate-pulse"></div>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-border mx-1"></div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:bg-accent text-muted-foreground hover:text-foreground group"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-1/2 transform translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default FloatingNavbar;