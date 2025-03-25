import { NavLink } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LogIn, LogOut, NotebookText, AppWindow, Settings } from 'lucide-react';
import { User } from '../hooks/useAuth';

const Appbar = ({ user }: { user: User | null }) => {
  // Function to add underline to active link
  const activeLinkClass = (isActive: boolean) =>
    isActive
      ? 'text-gray-900 font-semibold'
      : 'text-gray-700 hover:text-gray-900 hover:font-semibold';

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
  };

  return (
    <div className="flex flex-row gap-5 sm:gap-10">
      <NavLink
        to="/my-portfolio/projects"
        end
        className={({ isActive }) =>
          `flex flex-row items-center text-sm font-medium ${activeLinkClass(isActive)}`
        }
      >
        <AppWindow className="w-4 h-4 mr-2 hidden sm:flex" />
        Projects
      </NavLink>
      <NavLink
        to="/my-portfolio/notes"
        end
        className={({ isActive }) =>
          `flex flex-row items-center text-sm font-medium ${activeLinkClass(isActive)}`
        }
      >
        <NotebookText className="w-4 h-4 mr-2 hidden sm:flex" />
        Notes
      </NavLink>
      {user ? (
        <div className="flex items-center gap-5 sm:gap-10">
          <NavLink
            to="/my-portfolio/manage-projects"
            end
            className={({ isActive }) =>
              `flex flex-row items-center text-sm font-medium ${activeLinkClass(isActive)}`
            }
          >
            <Settings className="w-4 h-4 mr-2 hidden sm:flex" />
            Manage
          </NavLink>
          <button
            onClick={handleLogout}
            className="text-nowrap inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 hover:font-semibold"
          >
            <LogOut className="w-4 h-4 mr-2 hidden sm:flex" />
            Sign Out
          </button>
        </div>
      ) : (
        <NavLink
          to="/my-portfolio/login"
          end
          className={({ isActive }) =>
            `flex flex-row items-center text-sm font-medium ${activeLinkClass(isActive)}`
          }
        >
          <LogIn className="w-4 h-4 mr-2 hidden sm:flex" />
          Admin
        </NavLink>
      )}
    </div>
  );
};

export default Appbar;
