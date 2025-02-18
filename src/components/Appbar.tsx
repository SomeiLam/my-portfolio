import { NavLink, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LogIn, LogOut } from 'lucide-react';
import { User } from '../hooks/useAuth';

const Appbar = ({ user }: { user: User | null }) => {
  const location = useLocation(); // Use useLocation hook here inside the Router context

  // Function to add underline to active link
  const activeLinkClass = (isActive: boolean) =>
    isActive
      ? 'text-gray-900 font-semibold'
      : 'text-gray-700 hover:text-indigo-600';

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      {user ? (
        <div className="flex items-center gap-5">
          <NavLink
            to="/my-portfolio/dashboard"
            className={({ isActive }) =>
              `text-sm font-medium ${activeLinkClass(isActive)}`
            }
          >
            Dashboard
          </NavLink>
          <button
            onClick={handleLogout}
            className="text-nowrap inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </button>
        </div>
      ) : (
        location.pathname !== '/login' && (
          <NavLink
            to="/my-portfolio/login"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </NavLink>
        )
      )}
    </>
  );
};

export default Appbar;
