
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";

interface OfflineFeedbackNotificationProps {
  offlineFeedbackCount: number;
  networkStatus: boolean;
  isSyncing: boolean;
  onSync: () => void;
}

const OfflineFeedbackNotification: React.FC<OfflineFeedbackNotificationProps> = ({
  offlineFeedbackCount,
  networkStatus,
  isSyncing,
  onSync
}) => {
  if (offlineFeedbackCount === 0) return null;

  return (
    <div className="mt-4 p-3 bg-yellow-50 rounded-md border border-yellow-200">
      <h3 className="text-sm font-medium text-yellow-800 mb-1">Offline Feedback</h3>
      <p className="text-xs text-yellow-700 mb-2">
        You have {offlineFeedbackCount} feedback item(s) saved offline.
      </p>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onSync} 
        disabled={!networkStatus || isSyncing}
        className="text-xs"
      >
        {isSyncing ? (
          <>
            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
            Syncing...
          </>
        ) : (
          <>
            <RefreshCw className="mr-1 h-3 w-3" />
            Sync when online
          </>
        )}
      </Button>
    </div>
  );
};

export default OfflineFeedbackNotification;
