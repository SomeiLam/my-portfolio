import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Code2 } from 'lucide-react';
import Appbar from './Appbar';

const Header = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === '/my-portfolio'; // Check if it's the home page

  return (
    !isHomePage && (
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link
              to="/my-portfolio"
              className="flex flex-row items-center gap-3 w-full"
            >
              <Code2 className="w-8 h-8 text-gray-900" />
              <h1 className="text-lg sm:text-3xl font-bold text-gray-900">
                Amy Lam's Portfolio
              </h1>
            </Link>
            <Appbar user={user} />
          </div>
        </div>
      </header>
    )
  );
};

export default Header;
