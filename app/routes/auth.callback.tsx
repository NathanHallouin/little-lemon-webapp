import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const { error } = await supabase.auth.getSession();

      if (error) {
        console.error('Auth callback error:', error);
        navigate('/?error=auth');
      } else {
        // Redirect to home or intended page
        navigate('/');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-surface-light flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <motion.div
          className="w-16 h-16 mx-auto border-4 border-primary-200 border-t-primary-500 rounded-full mb-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <p className="text-neutral-600 font-medium">Completing sign in...</p>
      </motion.div>
    </div>
  );
}
