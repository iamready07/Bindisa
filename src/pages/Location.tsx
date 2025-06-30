import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Award, Users, Sprout } from "lucide-react";
import Hero from "../components/Hero";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

const Location: React.FC = () => {
  const navigate = useNavigate();

  const operatingAreas = [
    {
      district: "Gaya",
      description: "Our headquarters and primary operational area",
      farmers: 150,
      projects: 5,
      crops: ["Rice", "Wheat", "Maize"],
      achievements: ["Government Recognition", "Bihar Diwas Celebration"],
    },
    {
      district: "Nalanda",
      description: "Expanding operations with focus on vegetable farming",
      farmers: 75,
      projects: 2,
      crops: ["Vegetables", "Wheat"],
      achievements: ["Increased Yield Programs"],
    },
    {
      district: "Patna",
      description: "Urban agriculture and smart farming initiatives",
      farmers: 50,
      projects: 2,
      crops: ["Vegetables", "Maize"],
      achievements: ["Smart Irrigation Projects"],
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Our Presence in Bihar"
        subtitle="Empowering Farmers Across Districts"
        description="Discover our operational areas, pilot projects, and field centers across Bihar. We're expanding our reach to bring smart farming solutions to more agricultural communities."
        primaryAction={{
          text: "Contact Local Office",
          onClick: () => navigate("/contact"),
        }}
        secondaryAction={{
          text: "Join Our Network",
          onClick: () => navigate("/register"),
        }}
      />

      {/* Interactive Map Section */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Bihar Operations Map
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our technology is actively helping farmers across multiple
              districts in Bihar, with plans for further expansion.
            </p>
          </div>

          <Card className="card-agri mb-8">
            <CardContent className="p-0">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d922736.5761430574!2d84.89421545!3d25.6440845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed5844f55b4641%3A0x6c7e8c30c0e7e80e!2sBihar!5e0!3m2!1sen!2sin!4v1647254839685!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bihar Districts Map"
                ></iframe>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <MapPin className="w-8 h-8 text-agri-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">3</div>
              <div className="text-sm text-gray-600">Districts</div>
            </div>
            <div>
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">275+</div>
              <div className="text-sm text-gray-600">Farmers</div>
            </div>
            <div>
              <Sprout className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">9</div>
              <div className="text-sm text-gray-600">Active Projects</div>
            </div>
            <div>
              <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">5+</div>
              <div className="text-sm text-gray-600">Achievements</div>
            </div>
          </div>
        </div>
      </section>

      {/* Operating Areas */}
      <section className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Operating Areas
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Detailed overview of our presence and impact in each district.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {operatingAreas.map((area, index) => (
              <Card key={index} className="card-agri">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-agri-primary rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-xl">
                      {area.district} District
                    </CardTitle>
                  </div>
                  <p className="text-gray-600">{area.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center bg-gray-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-agri-primary">
                          {area.farmers}
                        </div>
                        <div className="text-xs text-gray-600">Farmers</div>
                      </div>
                      <div className="text-center bg-gray-50 rounded-lg p-3">
                        <div className="text-lg font-bold text-blue-600">
                          {area.projects}
                        </div>
                        <div className="text-xs text-gray-600">Projects</div>
                      </div>
                    </div>

                    {/* Crops */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Primary Crops
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {area.crops.map((crop, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                          >
                            {crop}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Key Achievements
                      </h4>
                      <ul className="space-y-1">
                        {area.achievements.map((achievement, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-600 flex items-center space-x-2"
                          >
                            <div className="w-1.5 h-1.5 bg-agri-primary rounded-full"></div>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Expansion Plans */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Expansion Plans 2025-2026
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our roadmap for expanding agricultural technology across more
              districts in Bihar and beyond.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-agri border-2 border-blue-200">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">
                  Phase 1: Current Districts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Strengthening operations in Gaya, Nalanda, and Patna
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>500+ farmers by end of 2025</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>15 pilot projects</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-agri border-2 border-yellow-200">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Sprout className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle className="text-lg">
                  Phase 2: New Districts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Expanding to Bhagalpur, Muzaffarpur, and Sitamarhi
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                    <span>Target: 300+ new farmers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
                    <span>Launch by Q3 2025</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="card-agri border-2 border-purple-200">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg">Phase 3: Beyond Bihar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Exploring opportunities in neighboring states
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    <span>Research partnerships</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    <span>Technology scaling</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 agri-gradient-bg text-white">
        <div className="container-max section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Join Our Growing Network
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Be part of the agricultural transformation in Bihar. Connect with us
            to bring smart farming solutions to your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/contact")}
              size="lg"
              variant="secondary"
              className="bg-white text-agri-primary hover:bg-gray-100"
            >
              Contact Local Office
            </Button>
            <Button
              onClick={() => navigate("/register")}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-agri-primary"
            >
              Register Your Farm
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Location;
