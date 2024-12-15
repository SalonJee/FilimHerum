import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon 
} from '@heroicons/react/24/outline';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  // Password visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  // Validation functions
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    // Password should be at least 8 characters long
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Comprehensive validation
    if (name.trim().length < 2) {
      toast.error('Name must be at least 2 characters long', {
        icon: <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
      });
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address', {
        icon: <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
      });
      return;
    }

    if (!validatePassword(password)) {
      toast.error('Password must be at least 8 characters long', {
        icon: <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match', {
        icon: <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
      });
      return;
    }

    try {
      setLoading(true);
      await signup(email, password, name);

      // Success toast with custom styling
      toast.success(
        <div className="flex items-center">
          <CheckCircleIcon className="h-6 w-6 text-green-500 mr-2" />
          <span>Account created successfully!</span>
        </div>,
        {
          duration: 3000,
          position: 'top-center',
          style: {
            background: '#4CAF50',
            color: 'white',
            fontWeight: 'bold',
            padding: '16px',
            borderRadius: '8px'
          }
        }
      );

      // Redirect after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      // Handle specific Firebase error codes
      const errorMessage = (() => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            return 'Email is already registered';
          case 'auth/weak-password':
            return 'Password is too weak';
          default:
            return error.message || 'Signup failed';
        }
      })();

      toast.error(
        <div className="flex items-center">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-500 mr-2" />
          <span>{errorMessage}</span>
        </div>,
        {
          duration: 4000,
          position: 'top-center',
          style: {
            background: '#F44336',
            color: 'white',
            fontWeight: 'bold',
            padding: '16px',
            borderRadius: '8px'
          }
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 rounded-lg text-white 
                placeholder:text-gray-300 border-2 border-transparent 
                focus:border-accent outline-none transition"
              disabled={loading}
              required
              minLength={2}
            />
          </div>

          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 rounded-lg text-white 
                placeholder:text-gray-300 border-2 border-transparent 
                focus:border-accent outline-none transition"
              disabled={loading}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 rounded-lg text-white 
                placeholder:text-gray-300 border-2 border-transparent 
                focus:border-accent outline-none transition"
              disabled={loading}
              required
              minLength={8}
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 rounded-lg text-white 
                placeholder:text-gray-300 border-2 border-transparent 
                focus:border-accent outline-none transition"
              disabled={loading}
              required
              minLength={8}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-accent hover:bg-accent-hover 
              text-white rounded-lg font-semibold 
              transition-colors disabled:opacity-50 
              disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-6 text-center text-gray-300">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="text-accent hover:text-accent-hover"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
