
import React from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ChartPlaceholderProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ChartPlaceholder: React.FC<ChartPlaceholderProps> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="p-8 flex justify-center items-center m-0 h-[600px]">
      <div className="text-center">
        <Icon size={64} className="mx-auto mb-4 text-gray-300" />
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-gray-500 mb-4">{description}</p>
        <Button>Generate {title}</Button>
      </div>
    </div>
  );
};

export default ChartPlaceholder;
