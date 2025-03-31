import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { ManageProjectPage } from './pages/ManageProjectPage';
import { ProjectFormPage } from './pages/ProjectFormPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import Projects from './pages/Projects';
import { NotesListPage } from './pages/NotesListPage';
import { NoteFormPage } from './pages/NoteFormPage';
import { NoteDetailPage } from './pages/NoteDetailPage';
import HomePage from './pages/HomePage';
import NotFound from './components/NotFound';
import './App.css';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/my-portfolio" element={<HomePage />} />
          <Route path="/my-portfolio/projects" element={<Projects />} />
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
