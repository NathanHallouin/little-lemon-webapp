import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { useAuth } from '../../providers/AuthProvider';
import AuthModal from './AuthModal';

interface ProtectedRouteProps {
  children: React.ReactNode;
  message?: string;
}

export default function ProtectedRoute({ children, message = 'Please sign in to continue' }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setShowAuthModal(true);
    }
  }, [loading, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-light flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <div className="min-h-screen bg-surface-light flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md"
          >
            <div className="w-20 h-20 mx-auto bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
              <Lock className="w-10 h-10 text-primary-600" />
            </div>
            <h1 className="font-display text-3xl font-bold text-primary-900 mb-3">
              Authentication Required
            </h1>
            <p className="text-neutral-600 mb-8">{message}</p>
            <motion.button
              onClick={() => setShowAuthModal(true)}
              className="px-8 py-3.5 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Sign In to Continue
            </motion.button>
          </motion.div>
        </div>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </>
    );
  }

  return <>{children}</>;
}
