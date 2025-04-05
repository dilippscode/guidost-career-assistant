
import React from "react";
import { Card } from "@/components/ui/card";
import MentorScheduling from "./MentorScheduling";

interface MentorCardProps {
  name: string;
  position: string;
  company: string;
  expertise: string[];
  image: string;
  rating: number;
  sessionPrice: string;
}

const MentorCard: React.FC<MentorCardProps> = ({
  name,
  position,
  company,
  expertise,
  image,
  rating,
  sessionPrice,
}) => {
  return (
    <Card className="overflow-hidden floating-card">
      <div className="p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <img
            src={image}
            alt={name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mx-auto md:mx-0"
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
            <div className="flex items-center mt-1 md:mt-0">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
                      i < rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-1">{rating.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-gray-600 mb-2">
            {position} at {company}
          </p>
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">Expertise:</p>
            <div className="flex flex-wrap gap-1">
              {expertise.map((skill, index) => (
                <span
                  key={index}
                  className="inline-block bg-guidost-100 text-guidost-800 px-2 py-1 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="text-mentor-600 font-medium">{sessionPrice} / 30 min session</div>
            <MentorScheduling 
              mentorName={name} 
              mentorImage={image} 
              sessionPrice={sessionPrice} 
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MentorCard;
