import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Leaf,
  Users,
  Target,
  Heart,
  Award,
  Building,
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

const About: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const values = [
    {
      icon: Leaf,
      title: "Innovation",
      description:
        "Pioneering new technologies to solve age-old agricultural challenges.",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: Heart,
      title: "Family Values",
      description:
        "Rooted in family traditions while embracing modern solutions.",
      color: "bg-red-50 text-red-600",
    },
    {
      icon: Users,
      title: "Farmer Empowerment",
      description: "Putting farmers at the center of everything we do.",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: Target,
      title: "Sustainability",
      description:
        "Building a future where agriculture and environment thrive together.",
      color: "bg-yellow-50 text-yellow-600",
    },
  ];

  const milestones = [
    {
      date: "February 2025",
      title: "Company Founded",
      description:
        "Bindisa Agritech Pvt. Ltd. officially incorporated in Gaya, Bihar.",
    },
    {
      date: "March 2025",
      title: "Government Recognition",
      description:
        "Received Letter of Appreciation from Hon'ble Minister Shri Jitan Ram Manjhi.",
    },
    {
      date: "March 2025",
      title: "Bihar Diwas Celebration",
      description:
        "Celebrated Bihar Diwas, emphasizing commitment to local farmers.",
    },
    {
      date: "April 2025",
      title: "Strategic Partnership",
      description:
        "Initiated collaboration with Krishi Tantra for enhanced agricultural solutions.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title={t("about.title")}
        subtitle={t("about.subtitle")}
        description="Learn about our journey, mission, and the passionate team behind Bindisa Agritech's innovative agricultural solutions."
        primaryAction={{
          text: "Meet Our Team",
          onClick: () => navigate("/team"),
        }}
        secondaryAction={{
          text: "Our Technology",
          onClick: () => navigate("/technology"),
        }}
      />

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Bindisa Agritech Pvt. Ltd. is a forward-thinking agritech
                startup based in Gaya, Bihar, India, founded in early 2025. Our
                company's mission is encapsulated in our motto:
              </p>

              <div className="text-center my-8 p-6 bg-gradient-to-r from-agri-primary/10 to-agri-secondary/10 rounded-xl">
                <h3 className="text-2xl font-bold agri-text-gradient mb-2">
                  INNOVATE. CULTIVATE. ELEVATE.
                </h3>
                <p className="text-gray-600">
                  Aiming to revolutionize agriculture through the integration of
                  advanced technologies and sustainable practices.
                </p>
              </div>

              <p className="text-gray-600 mb-6">{t("about.name-origin")}</p>

              <div className="flex items-center space-x-6 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                    <span className="text-blue-600 font-bold text-lg">BIN</span>
                  </div>
                  <span className="text-sm text-gray-600">Bindi</span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <span className="text-green-600 font-bold text-lg">DI</span>
                  </div>
                  <span className="text-sm text-gray-600">Dipa</span>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                    <span className="text-yellow-600 font-bold text-lg">
                      SA
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">Santosh</span>
                </div>
              </div>

              <p className="text-gray-600">
                This legacy reminds us that agriculture is not just about
                technology; it's about people, communities, and a shared future.
              </p>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-agri-primary/20 to-agri-secondary/20 rounded-2xl p-8 flex flex-col justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Leaf className="w-12 h-12 text-agri-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Company Overview
                  </h3>
                  <div className="space-y-3 text-left">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Founded:</span>
                      <span className="font-semibold">February 17, 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-semibold">Gaya, Bihar</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-semibold">Private Limited</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">CIN:</span>
                      <span className="font-semibold text-xs">
                        U46539BR2025PTC073688
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Vision & Mission
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our vision and mission guide every decision we make and every
              solution we develop.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="card-agri">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{t("about.vision")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  To be the leading force in revolutionizing agriculture by
                  marrying the age-wisdom of conventional farming with the
                  dynamic potential of new-generation agricultural technologies.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-agri-primary rounded-full mt-2"></div>
                    <span>
                      Creating a more efficient agricultural ecosystem
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-agri-primary rounded-full mt-2"></div>
                    <span>
                      Building resilient and equitable farming practices
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-agri-primary rounded-full mt-2"></div>
                    <span>Ensuring food security for future generations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-agri">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl">{t("about.mission")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  To equip farmers, agribusinesses, and communities with smart
                  solutions that increase productivity, sustainability, and food
                  security through cutting-edge technology.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-agri-secondary rounded-full mt-2"></div>
                    <span>
                      Providing accessible and localized technology solutions
                    </span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-agri-secondary rounded-full mt-2"></div>
                    <span>Empowering small and marginal farmers</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-agri-secondary rounded-full mt-2"></div>
                    <span>Promoting sustainable agricultural practices</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t("about.values")}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The core principles that drive our work and shape our
              relationships with farmers and communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="card-agri text-center">
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${value.color}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Bindisa */}
      <section className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Bindisa?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our company is leading the way to a revolution that marries the
                age-wisdom of conventional farming with the dynamic potential of
                new-generation agricultural technologies.
              </p>
              <p className="text-gray-600 mb-6">
                Through combining smart digital tools, real-time analytics, and
                easy-to-use, farmer-friendly technologies, we empower growers to
                make better, data-led decisions throughout the farming process.
              </p>
              <p className="text-gray-600 mb-8">
                From the ground under our feet to the cloud above in the digital
                sphere, and all the way to a bountiful harvest, our company is
                growing a future where farming is not only more efficient—but
                also more resilient, equitable, and smart.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-agri-primary">
                    ₹1L
                  </div>
                  <div className="text-sm text-gray-600">
                    Authorized Capital
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-agri-secondary">
                    Bihar
                  </div>
                  <div className="text-sm text-gray-600">Based in Gaya</div>
                </div>
              </div>

              <Button
                onClick={() => navigate("/team")}
                className="btn-agri-primary"
              >
                Meet Our Team <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Company Milestones
              </h3>
              {milestones.map((milestone, index) => (
                <div key={index} className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-3 h-3 bg-agri-primary rounded-full mt-2"></div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-16 bg-gray-200 ml-1 mt-2"></div>
                    )}
                  </div>
                  <div className="pb-8">
                    <div className="text-sm text-agri-primary font-semibold">
                      {milestone.date}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {milestone.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 agri-gradient-bg text-white">
        <div className="container-max section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Our Mission?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Be part of the agricultural revolution that's empowering farmers
            across Bihar and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/contact")}
              size="lg"
              variant="secondary"
              className="bg-white text-agri-primary hover:bg-gray-100"
            >
              Get in Touch
            </Button>
            <Button
              onClick={() => navigate("/technology")}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-agri-primary"
            >
              Explore Technology
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
