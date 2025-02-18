import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProjectFormPage } from './pages/ProjectFormPage';
import { ProjectDetailsPage } from './pages/ProjectDetailsPage';
import { HomePage } from './pages/HomePage';
import Appbar from './components/Appbar';

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex flex-row items-center gap-3 w-full">
                <Code2 className="w-8 h-8 text-indigo-600" />
                <h1 className="text-3xl font-bold text-gray-900">
                  My Portfolio
                </h1>
              </Link>
              <Appbar user={user} />
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/new"
            element={
              <ProtectedRoute>
                <ProjectFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/projects/:id/edit"
            element={
              <ProtectedRoute>
                <ProjectFormPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
