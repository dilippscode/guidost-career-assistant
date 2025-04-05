
import React, { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface MentorSchedulingProps {
  mentorName: string;
  mentorImage: string;
  sessionPrice: string;
}

const MentorScheduling: React.FC<MentorSchedulingProps> = ({
  mentorName,
  mentorImage,
  sessionPrice,
}) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const timeSlots = [
    "9:00 AM - 9:30 AM",
    "10:00 AM - 10:30 AM",
    "11:00 AM - 11:30 AM",
    "1:00 PM - 1:30 PM",
    "2:00 PM - 2:30 PM",
    "3:00 PM - 3:30 PM",
    "4:00 PM - 4:30 PM",
  ];

  const handleScheduleSession = () => {
    if (!date || !timeSlot) {
      toast.error("Please select both a date and time slot");
      return;
    }

    toast.success(
      `Session with ${mentorName} scheduled for ${date.toLocaleDateString()} at ${timeSlot}`
    );
    setIsOpen(false);
    setDate(undefined);
    setTimeSlot(undefined);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 bg-mentor-600 hover:bg-mentor-700">
          <Calendar className="h-4 w-4" />
          Schedule Session
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule a Session</DialogTitle>
          <DialogDescription>
            Book a 30-minute mentoring session with {mentorName} for {sessionPrice}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-4">
          <img 
            src={mentorImage} 
            alt={mentorName} 
            className="w-20 h-20 rounded-full object-cover mb-3" 
          />
          <h3 className="text-lg font-medium mb-4">{mentorName}</h3>
          
          <div className="grid w-full gap-4">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Select a date</label>
              <div className="border rounded-md p-2">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => {
                    // Disable past dates and weekends
                    const now = new Date();
                    now.setHours(0, 0, 0, 0);
                    const day = date.getDay();
                    return date < now || day === 0 || day === 6;
                  }}
                  className="mx-auto"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Select a time slot</label>
              <Select onValueChange={setTimeSlot} value={timeSlot}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between items-center">
          <p className="text-sm text-gray-500 mb-3 sm:mb-0">
            You can reschedule up to 24 hours before
          </p>
          <Button 
            onClick={handleScheduleSession} 
            className="w-full sm:w-auto"
          >
            Confirm Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MentorScheduling;
