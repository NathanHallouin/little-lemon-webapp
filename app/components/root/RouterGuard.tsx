import React from 'react';
import { useLoading } from '../../providers/LoadingProvider';

interface RouterGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Router guard component that prevents rendering until loading is complete
 * @param children - React children to render when not loading
 * @param fallback - Fallback component to show while loading
 * @returns Children or fallback based on loading state
 */
export const RouterGuard: React.FC<RouterGuardProps> = ({ 
  children, 
  fallback = <div>Loading...</div> 
}) => {
  const { isLoading } = useLoading();

  if (isLoading) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}; 