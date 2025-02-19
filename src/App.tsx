import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Code2 } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { ManageProjectPage } from './pages/ManageProjectPage';
import { ProjectFormPage } from './pages/ProjectFormPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { HomePage } from './pages/HomePage';
import Appbar from './components/Appbar';
import { NotesListPage } from './pages/NotesListPage';
import { NoteFormPage } from './pages/NoteFormPage';
import { NoteDetailPage } from './pages/NoteDetailPage';

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <Link
                to="/my-portfolio"
                className="flex flex-row items-center gap-3 w-full"
              >
                <Code2 className="w-8 h-8 text-indigo-600" />
                <h1 className="text-3xl font-bold text-gray-900">
                  Amy Lam's Portfolio
                </h1>
              </Link>
              <Appbar user={user} />
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/my-portfolio" element={<HomePage />} />
          <Route path="/my-portfolio/login" element={<LoginPage />} />
          <Route
            path="/my-portfolio/projects/:id"
            element={<ProjectDetailPage />}
          />
          <Route path="/my-portfolio/notes/:id" element={<NoteDetailPage />} />
          <Route path="/my-portfolio/notes" element={<NotesListPage />} />
          <Route
            path="/my-portfolio/manage-projects"
            element={
              <ProtectedRoute>
                <ManageProjectPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-portfolio/projects/new"
            element={
              <ProtectedRoute>
                <ProjectFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-portfolio/projects/:id/edit"
            element={
              <ProtectedRoute>
                <ProjectFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-portfolio/notes/new"
            element={
              <ProtectedRoute>
                <NoteFormPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-portfolio/notes/:id/edit"
            element={
              <ProtectedRoute>
                <NoteFormPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
