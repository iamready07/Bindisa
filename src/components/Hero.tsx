import React from "react";
import { Button } from "./ui/button";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    text: string;
    onClick: () => void;
  };
  secondaryAction?: {
    text: string;
    onClick: () => void;
  };
  backgroundImage?: string;
  className?: string;
  children?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  backgroundImage,
  className = "",
  children,
}) => {
  return (
    <section
      className={`relative py-20 lg:py-32 hero-bg ${className}`}
      style={
        backgroundImage
          ? {
              backgroundImage: `linear-gradient(180deg, rgba(202, 202, 202, 0.56) 0%, rgba(100, 100, 100, 0.39) 100%), url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}
      }
    >
      <div className="container-max section-padding relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {subtitle && (
            <p className="text-lg text-agri-primary font-semibold mb-4 animate-fade-in">
              {subtitle}
            </p>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            <span className="agri-text-gradient">{title}</span>
          </h1>

          {description && (
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto animate-fade-in">
              {description}
            </p>
          )}

          {(primaryAction || secondaryAction) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              {primaryAction && (
                <Button
                  onClick={primaryAction.onClick}
                  size="lg"
                  className="btn-agri-primary text-lg px-8 py-4"
                >
                  {primaryAction.text}
                </Button>
              )}
              {secondaryAction && (
                <Button
                  onClick={secondaryAction.onClick}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4 border-agri-primary text-agri-primary hover:bg-agri-primary hover:text-white"
                >
                  {secondaryAction.text}
                </Button>
              )}
            </div>
          )}

          {children && <div className="mt-12 animate-fade-in">{children}</div>}
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-agri-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-agri-secondary/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;
