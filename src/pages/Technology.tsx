import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  Shield,
  BarChart3,
  Leaf,
  Cpu,
  Cloud,
  Smartphone,
  Satellite,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Hero from "../components/Hero";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useLanguage } from "../contexts/LanguageContext";

const Technology: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const technologies = [
    {
      icon: Brain,
      title: "Artificial Intelligence & Machine Learning",
      description:
        "Advanced algorithms for crop prediction, yield optimization, and smart farming decisions.",
      features: [
        "Crop yield prediction",
        "Disease identification",
        "Weather pattern analysis",
        "Market price forecasting",
      ],
      color: "bg-blue-50 text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      icon: Satellite,
      title: "IoT & Smart Sensors",
      description:
        "Real-time monitoring of soil, weather, and crop conditions with smart sensors.",
      features: [
        "Soil moisture monitoring",
        "Temperature tracking",
        "pH level analysis",
        "Automated irrigation",
      ],
      color: "bg-green-50 text-green-600",
      borderColor: "border-green-200",
    },
    {
      icon: BarChart3,
      title: "Data Analytics & Insights",
      description:
        "Comprehensive insights and recommendations based on farm data and patterns.",
      features: [
        "Real-time dashboards",
        "Historical trend analysis",
        "Performance metrics",
        "Predictive analytics",
      ],
      color: "bg-purple-50 text-purple-600",
      borderColor: "border-purple-200",
    },
    {
      icon: Cloud,
      title: "Cloud Computing Platform",
      description:
        "Scalable cloud infrastructure for data processing and storage.",
      features: [
        "Data backup & security",
        "Remote accessibility",
        "Scalable storage",
        "API integrations",
      ],
      color: "bg-indigo-50 text-indigo-600",
      borderColor: "border-indigo-200",
    },
  ];

  const focusAreas = [
    {
      icon: Leaf,
      title: t("tech.smart-farming"),
      description:
        "Leveraging AI insights to maximize resource utilization and crop yield.",
      applications: [
        "Precision seeding and planting",
        "Optimal fertilizer application",
        "Irrigation scheduling",
        "Harvest timing optimization",
      ],
    },
    {
      icon: Shield,
      title: t("tech.disaster-forecasting"),
      description:
        "Crafting sophisticated models to forecast and forestall agricultural risks.",
      applications: [
        "Weather prediction models",
        "Pest outbreak alerts",
        "Disease early warning",
        "Market volatility analysis",
      ],
    },
    {
      icon: Leaf,
      title: t("tech.climate-smart"),
      description:
        "Encouraging environmentally friendly agricultural practices for sustained development.",
      applications: [
        "Carbon footprint tracking",
        "Water conservation strategies",
        "Sustainable crop rotation",
        "Organic farming guidance",
      ],
    },
    {
      icon: BarChart3,
      title: t("tech.data-driven"),
      description:
        "Enabling farmers to make effective farming decisions using real-time information.",
      applications: [
        "Mobile app interface",
        "SMS-based alerts",
        "Voice notifications",
        "Multi-language support",
      ],
    },
  ];

  const platforms = [
    {
      icon: Smartphone,
      title: "Mobile Application",
      description:
        "User-friendly mobile app for farmers with multilingual support.",
      features: [
        "Hindi, Marathi & English support",
        "Offline functionality",
        "Voice commands",
        "Simple interface",
      ],
    },
    {
      icon: Cloud,
      title: "Web Dashboard",
      description:
        "Comprehensive web platform for detailed analytics and management.",
      features: [
        "Real-time monitoring",
        "Historical data",
        "Export reports",
        "Multi-farm management",
      ],
    },
    {
      icon: Cpu,
      title: "API Integration",
      description:
        "Seamless integration with existing agricultural systems and tools.",
      features: [
        "Third-party integrations",
        "Custom APIs",
        "Data synchronization",
        "Webhook support",
      ],
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Technology That Transforms"
        subtitle="Innovative Agricultural Solutions"
        description="We leverage AI, Machine Learning, IoT, and Knowledge Graph-based intelligence to build smarter and more efficient agricultural systems."
        primaryAction={{
          text: "Try Our Soil Analysis",
          onClick: () => navigate("/soil-analysis"),
        }}
        secondaryAction={{
          text: "Chat with Our AI",
          onClick: () => navigate("/chatbot"),
        }}
      />

      {/* Core Technologies */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Core Technologies
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our technology stack combines cutting-edge innovations to deliver
              comprehensive agricultural solutions for modern farmers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <Card
                  key={index}
                  className={`card-agri border-2 ${tech.borderColor}`}
                >
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${tech.color}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">{tech.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{tech.description}</p>
                    <ul className="space-y-2">
                      {tech.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center space-x-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Technological Focus Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our company is currently involved in various innovative projects
              that address key challenges in modern agriculture.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {focusAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <div key={index} className="card-agri p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-agri-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-agri-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {area.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{area.description}</p>
                      <div className="space-y-2">
                        {area.applications.map((app, idx) => (
                          <div
                            key={idx}
                            className="flex items-center space-x-2"
                          >
                            <div className="w-1.5 h-1.5 bg-agri-primary rounded-full"></div>
                            <span className="text-sm text-gray-600">{app}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Solutions */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Platform Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Multiple access points to our technology, designed to meet farmers
              where they are and provide the tools they need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <Card key={index} className="card-agri text-center">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-agri-primary to-agri-primary-light rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{platform.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{platform.description}</p>
                    <ul className="space-y-2">
                      {platform.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center justify-center space-x-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Benefits for Farmers
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our technology makes it possible for even marginal and small
                farmers to tap the power of advanced agri-tech through
                accessible, localized, and ready-for-real-world solutions.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Increased Productivity
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Optimize resource utilization and maximize crop yields
                      with data-driven insights.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Cost Reduction
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Reduce input costs through precise application of
                      fertilizers, water, and pesticides.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Risk Mitigation
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Early warning systems help prevent crop losses from
                      diseases, pests, and weather.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Sustainable Practices
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Promote environmentally friendly farming that preserves
                      soil health and resources.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-agri-primary/20 to-agri-secondary/20 rounded-2xl p-8 flex flex-col justify-center">
                <div className="text-center">
                  <Brain className="w-16 h-16 text-agri-primary mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    AI-Powered Solutions
                  </h3>
                  <p className="text-gray-600 mb-6">
                    From the ground under our feet to the cloud above in the
                    digital sphere, our technology creates a future where
                    farming is efficient, resilient, and smart.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-lg font-bold text-agri-primary">
                        45%
                      </div>
                      <div className="text-xs text-gray-600">
                        Yield Increase
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <div className="text-lg font-bold text-agri-secondary">
                        30%
                      </div>
                      <div className="text-xs text-gray-600">
                        Cost Reduction
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 agri-gradient-bg text-white">
        <div className="container-max section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Experience Our Technology
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Try our innovative tools and see how technology can transform your
            farming practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/soil-analysis")}
              size="lg"
              variant="secondary"
              className="bg-white text-agri-primary hover:bg-gray-100"
            >
              Analyze Your Soil <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              onClick={() => navigate("/chatbot")}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-agri-primary"
            >
              Chat with AI Assistant <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Technology;
