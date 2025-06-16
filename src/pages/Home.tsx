import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Sprout,
  Users,
  TrendingUp,
  Award,
  ArrowRight,
  Leaf,
  Brain,
  Shield,
  BarChart3,
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

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const stats = [
    {
      icon: Users,
      label: "Farmers Empowered",
      value: "1000+",
      color: "text-agri-primary",
    },
    {
      icon: TrendingUp,
      label: "Yield Improvement",
      value: "45%",
      color: "text-agri-secondary",
    },
    {
      icon: Sprout,
      label: "Crops Supported",
      value: "15+",
      color: "text-green-600",
    },
    {
      icon: Award,
      label: "Recognition",
      value: "5+",
      color: "text-yellow-600",
    },
  ];

  const technologies = [
    {
      icon: Brain,
      title: "AI & Machine Learning",
      description:
        "Advanced algorithms for crop prediction, yield optimization, and smart farming decisions.",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Shield,
      title: "IoT Solutions",
      description:
        "Real-time monitoring of soil, weather, and crop conditions with smart sensors.",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: BarChart3,
      title: "Data Analytics",
      description:
        "Comprehensive insights and recommendations based on farm data and patterns.",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: Leaf,
      title: "Sustainable Practices",
      description:
        "Eco-friendly farming methods that preserve soil health and reduce environmental impact.",
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  const features = [
    {
      title: "Smart Soil Analysis",
      description:
        "Get detailed insights about your soil health, pH levels, nutrient content, and crop recommendations.",
      action: () => navigate("/soil-analysis"),
    },
    {
      title: "Multilingual Chatbot",
      description:
        "Get farming advice in Hindi, Marathi, or English from our AI-powered agricultural assistant.",
      action: () => navigate("/chatbot"),
    },
    {
      title: "Success Stories",
      description:
        "Learn from farmers who have transformed their yields using our technology.",
      action: () => navigate("/success-stories"),
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title={t("hero.tagline")}
        subtitle={t("hero.subtitle")}
        description={t("hero.description")}
        primaryAction={{
          text: t("hero.cta"),
          onClick: () => navigate("/about"),
        }}
        secondaryAction={{
          text: t("hero.learn-more"),
          onClick: () => navigate("/technology"),
        }}
      >
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div
                  className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-white shadow-md flex items-center justify-center ${stat.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </Hero>

      {/* About Bindisa Section */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Who We Are
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Bindisa Agritech is more than just a company—it's a vision built
                on family values, innovation, and impact. The name "Bindisa" is
                inspired by the names of our founder's loved ones:
              </p>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-semibold">BINdi</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-semibold">DIpa</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-semibold">SAntosh</span>
                </div>
              </div>
              <p className="text-gray-600 mb-8">
                This legacy reminds us that agriculture is not just about
                technology; it's about people, communities, and a shared future.
              </p>
              <Button
                onClick={() => navigate("/about")}
                className="btn-agri-primary"
              >
                Learn More About Us <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-agri-primary/20 to-agri-secondary/20 rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 bg-agri-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sprout className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-agri-primary mb-2">
                    Our Mission
                  </h3>
                  <p className="text-gray-600">INNOVATE. CULTIVATE. ELEVATE.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Highlights */}
      <section className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Technology That Transforms
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We leverage AI, Machine Learning, IoT, and Knowledge Graph-based
              intelligence to build smarter and more efficient agricultural
              systems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <Card key={index} className="card-agri">
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${tech.color}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg">{tech.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{tech.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => navigate("/technology")}
              className="btn-agri-primary"
            >
              Explore Our Technology <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Solutions for Modern Farmers
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform provides comprehensive tools and insights to help
              farmers make data-driven decisions and improve their agricultural
              outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="card-agri group cursor-pointer"
                onClick={feature.action}
              >
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-agri-primary transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="flex items-center text-agri-primary font-medium">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A dynamic team of young professionals with diverse expertise,
              united by our mission to revolutionize agriculture in India.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Key team members preview */}
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-agri-primary to-agri-primary-light rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                AP
              </div>
              <h3 className="text-xl font-semibold mb-2">Mr. Aditya Prakash</h3>
              <p className="text-agri-primary font-medium mb-2">President</p>
              <p className="text-gray-600 text-sm">
                Leading the company's future and strategic decisions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-agri-secondary to-agri-secondary-light rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                AS
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Mr. Aaditya Kumar Sinha
              </h3>
              <p className="text-agri-primary font-medium mb-2">Director</p>
              <p className="text-gray-600 text-sm">
                Steering the company's vision and strategic direction.
              </p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-green-400 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                GK
              </div>
              <h3 className="text-xl font-semibold mb-2">Gitanjali Kumari</h3>
              <p className="text-agri-primary font-medium mb-2">Co-founder</p>
              <p className="text-gray-600 text-sm">
                Bridging technology and agricultural challenges.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={() => navigate("/team")}
              className="btn-agri-primary"
            >
              Meet Our Full Team <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Recognition Section */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recognition & Achievements
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Despite being a nascent company, we have garnered significant
              attention and recognition for our innovative contributions to
              agriculture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-agri">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle>Government Recognition</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Received Letter of Appreciation from Hon'ble Minister Shri
                  Jitan Ram Manjhi for innovative contributions to agriculture.
                </p>
              </CardContent>
            </Card>

            <Card className="card-agri">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Bihar Diwas Celebration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Celebrated Bihar Diwas, emphasizing our commitment to
                  empowering local farmers with cutting-edge technology.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={() => navigate("/achievements")}
              className="btn-agri-primary"
            >
              View All Achievements <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 agri-gradient-bg text-white">
        <div className="container-max section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of farmers who are already using our technology to
            increase their yields and build a sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/contact")}
              size="lg"
              variant="secondary"
              className="bg-white text-agri-primary hover:bg-gray-100"
            >
              Get Started Today
            </Button>
            <Button
              onClick={() => navigate("/chatbot")}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-agri-primary"
            >
              Try Our Chatbot
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
