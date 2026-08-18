import React from 'react';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { WifiOff, Wifi } from 'lucide-react';

const NetworkStatus = () => {
  const isOnline = useNetworkStatus();

  if (isOnline) {
    return null; // Don't show anything when online
  }

  return (
    <div className="fixed top-20 left-0 right-0 bg-red-600 text-white px-4 py-2 text-center z-50">
      <div className="flex items-center justify-center space-x-2">
        <WifiOff className="h-4 w-4" />
        <span className="text-sm font-medium">
          You're offline. Some features may not work properly.
        </span>
      </div>
    </div>
  );
};

export default NetworkStatus;