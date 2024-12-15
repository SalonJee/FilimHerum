import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Spinner from './components/Common/Spinner';

// Lazy load pages
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Home = lazy(() => import('./pages/Home'));
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const Settings = lazy(() => import('./pages/Settings'));
const Recommendations = lazy(() => import('./pages/Recommendations')); // NEW

function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<Spinner fullScreen />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
           
            {/* Protected Home Route */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />

            {/* Protected Favorites Route */}
            <Route
              path="/favorites"
              element={
                <PrivateRoute>
                  <FavoritesPage />
                </PrivateRoute>
              }
            />

            {/* Protected Settings Route */}
            <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />

            {/* NEW: Protected Recommendations Route */}
            <Route
              path="/recommendations"
              element={
                <PrivateRoute>
                  <Recommendations />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>

        <Toaster 
          position="top-right" 
          toastOptions={{
            success: {
              style: {
                background: '#4CAF50',
                color: 'white',
              },
            },
            error: {
              style: {
                background: '#F44336',
                color: 'white',
              },
            },
            duration: 4000,
          }}
        />
      </AuthProvider>
    </Router>
  );
}

export default App;