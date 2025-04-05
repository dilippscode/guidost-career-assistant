
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VoiceSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">Select Voice</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select voice" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="alloy">Alloy (Neutral)</SelectItem>
          <SelectItem value="echo">Echo (Male)</SelectItem>
          <SelectItem value="fable">Fable (Male)</SelectItem>
          <SelectItem value="onyx">Onyx (Male)</SelectItem>
          <SelectItem value="nova">Nova (Female)</SelectItem>
          <SelectItem value="shimmer">Shimmer (Female)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default VoiceSelector;
