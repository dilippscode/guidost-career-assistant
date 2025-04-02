
import React from "react";
import { Card } from "@/components/ui/card";

const Testimonials = () => {
  const testimonials = [
    {
      content: "GuiDost helped me discover my passion for data science. The roadmap was incredibly detailed, and the mentor I connected with has been instrumental in my career transition.",
      author: "Sarah Johnson",
      position: "Data Science Student",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
    },
    {
      content: "The career compass bot provided me with insights about engineering fields I had never considered. Now I'm pursuing aerospace engineering and loving every minute of it!",
      author: "Michael Chen",
      position: "Engineering Undergraduate",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
      content: "As a first-generation college student, I was overwhelmed with career choices. GuiDost's personalized guidance and mentorship connections made all the difference.",
      author: "Priya Patel",
      position: "Psychology Graduate",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-heading">
            Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from students and professionals who transformed their careers with GuiDost.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 floating-card">
              <svg
                className="h-8 w-8 text-guidost-400 mb-4"
                fill="currentColor"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="text-gray-600 mb-6 italic">{testimonial.content}</p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div>
                  <p className="text-gray-900 font-medium">{testimonial.author}</p>
                  <p className="text-gray-500">{testimonial.position}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
