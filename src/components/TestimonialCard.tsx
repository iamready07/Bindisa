import React from "react";
import { MapPin, TrendingUp, Sprout } from "lucide-react";
import { Testimonial } from "../data/testimonials";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="card-agri p-6 group hover:scale-105 transition-transform duration-300">
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-agri-primary to-agri-primary-light rounded-full flex items-center justify-center text-white font-bold text-lg overflow-hidden flex-shrink-0">
          {testimonial.image ? (
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-full h-full object-cover"
            />
          ) : (
            testimonial.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {testimonial.name}
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
            <MapPin className="w-4 h-4" />
            <span>{testimonial.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Sprout className="w-4 h-4 text-agri-primary" />
            <span className="text-agri-primary font-medium">
              {testimonial.crop}
            </span>
          </div>
        </div>
      </div>

      <blockquote className="text-gray-700 italic mb-4 leading-relaxed">
        "{testimonial.story}"
      </blockquote>

      {/* Yield Improvement Stats */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-600">
            Yield Improvement
          </span>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-lg font-bold text-green-600">
              +{testimonial.yieldImprovement}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-sm text-gray-500 mb-1">Before</div>
            <div className="text-lg font-semibold text-gray-900">
              {testimonial.beforeYield} क्विंटल
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-sm text-gray-500 mb-1">After</div>
            <div className="text-lg font-semibold text-green-700">
              {testimonial.afterYield} क्विंटल
            </div>
          </div>
        </div>
      </div>

      {/* Category Badge */}
      <div className="mt-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
            testimonial.category === "small-farmer"
              ? "bg-blue-100 text-blue-800"
              : testimonial.category === "medium-farmer"
                ? "bg-green-100 text-green-800"
                : "bg-purple-100 text-purple-800"
          }`}
        >
          {testimonial.category === "small-farmer"
            ? "छोटे किसान"
            : testimonial.category === "medium-farmer"
              ? "मध्यम किसान"
              : "बड़े किसान"}
        </span>
      </div>
    </div>
  );
};

export default TestimonialCard;
