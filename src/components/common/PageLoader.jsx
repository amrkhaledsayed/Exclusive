import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LifeLine } from 'react-loading-indicators';

const PageLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, [location]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000033] backdrop-blur-sm">
      <LifeLine color="#cd3232" size="medium" text="" textColor="" />{' '}
    </div>
  );
};

export default PageLoader;
