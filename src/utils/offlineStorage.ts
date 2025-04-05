
import { toast } from "sonner";

interface OfflineData {
  text: string;
  voice: string;
  timestamp: number;
}

// Check if the browser is online
export const isOnline = (): boolean => {
  return navigator.onLine;
};

// Save feedback data for offline use
export const saveOfflineFeedback = (data: OfflineData): void => {
  try {
    // Get existing offline data
    const existingData = getOfflineFeedback();
    
    // Add new data
    existingData.push(data);
    
    // Save to localStorage
    localStorage.setItem('offline_feedback', JSON.stringify(existingData));
    
    toast.success("Feedback saved for offline use");
  } catch (error) {
    console.error("Error saving offline feedback:", error);
    toast.error("Failed to save feedback offline");
  }
};

// Get all offline feedback data
export const getOfflineFeedback = (): OfflineData[] => {
  try {
    const data = localStorage.getItem('offline_feedback');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error retrieving offline feedback:", error);
    return [];
  }
};

// Remove a specific offline feedback entry
export const removeOfflineFeedback = (timestamp: number): void => {
  try {
    const existingData = getOfflineFeedback();
    const updatedData = existingData.filter(item => item.timestamp !== timestamp);
    localStorage.setItem('offline_feedback', JSON.stringify(updatedData));
  } catch (error) {
    console.error("Error removing offline feedback:", error);
  }
};

// Clear all offline feedback
export const clearOfflineFeedback = (): void => {
  localStorage.removeItem('offline_feedback');
  toast.success("Offline feedback data cleared");
};
