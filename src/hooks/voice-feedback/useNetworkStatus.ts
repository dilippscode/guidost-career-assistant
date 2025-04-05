
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { isOnline, getOfflineFeedback } from "@/utils/offlineStorage";
import { OfflineData } from "./types";

export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<boolean>(isOnline());
  const [offlineFeedback, setOfflineFeedback] = useState<OfflineData[]>([]);
  
  useEffect(() => {
    const handleOnline = () => {
      setNetworkStatus(true);
      toast.success("You're back online!");
    };

    const handleOffline = () => {
      setNetworkStatus(false);
      toast.warning("You're offline. Feedback will be saved for later.");
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load any saved offline feedback
    setOfflineFeedback(getOfflineFeedback());

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    networkStatus,
    setNetworkStatus,
    offlineFeedback,
    setOfflineFeedback
  };
};
