import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Book,
  Users,
  Calendar,
  Camera,
  MessageCircle,
  Phone,
  Download,
} from "lucide-react";
import Hero from "../components/Hero";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

const FarmerHelp: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("help");

  const helpTopics = [
    {
      title: "Soil Testing & Analysis",
      description: "Learn how to test your soil and interpret results",
      icon: "🧪",
      articles: [
        "How to collect soil samples",
        "Understanding pH levels",
        "NPK testing basics",
        "Soil improvement techniques",
      ],
    },
    {
      title: "Pest & Disease Management",
      description: "Identify and treat common crop problems",
      icon: "🐛",
      articles: [
        "Common rice pests in Bihar",
        "Organic pest control methods",
        "Disease prevention strategies",
        "When to use pesticides",
      ],
    },
    {
      title: "Irrigation & Water Management",
      description: "Optimize water usage for better yields",
      icon: "💧",
      articles: [
        "Drip irrigation setup",
        "Water scheduling tips",
        "Monsoon water management",
        "Water conservation techniques",
      ],
    },
    {
      title: "Crop Management",
      description: "Best practices for different crops",
      icon: "🌾",
      articles: [
        "Rice cultivation guide",
        "Wheat farming techniques",
        "Vegetable growing tips",
        "Harvest timing strategies",
      ],
    },
    {
      title: "Technology Usage",
      description: "How to use our digital tools",
      icon: "📱",
      articles: [
        "Using the mobile app",
        "Understanding AI recommendations",
        "IoT sensor installation",
        "Data interpretation guide",
      ],
    },
    {
      title: "Financial Planning",
      description: "Farm economics and budgeting",
      icon: "💰",
      articles: [
        "Crop insurance basics",
        "Input cost calculation",
        "Profit maximization tips",
        "Government scheme information",
      ],
    },
  ];

  const trainingEvents = [
    {
      title: "Smart Farming Workshop",
      date: "2025-02-15",
      location: "Gaya Agricultural Center",
      participants: 45,
      description: "Introduction to IoT sensors and data-driven farming",
    },
    {
      title: "Soil Health Seminar",
      date: "2025-03-10",
      location: "Nalanda Field Center",
      participants: 32,
      description: "Comprehensive soil testing and improvement techniques",
    },
    {
      title: "Technology Training",
      date: "2025-03-25",
      location: "Patna Training Facility",
      participants: 28,
      description: "Mobile app usage and AI assistant training",
    },
  ];

  const galleryImages = [
    {
      src: "/api/placeholder/300/200",
      caption: "Farmers learning soil testing techniques",
      event: "Soil Health Workshop",
    },
    {
      src: "/api/placeholder/300/200",
      caption: "IoT sensor installation training",
      event: "Smart Farming Session",
    },
    {
      src: "/api/placeholder/300/200",
      caption: "Group discussion on crop management",
      event: "Field Day Event",
    },
    {
      src: "/api/placeholder/300/200",
      caption: "Technology demonstration",
      event: "Digital Farming Seminar",
    },
    {
      src: "/api/placeholder/300/200",
      caption: "Certificate distribution ceremony",
      event: "Training Completion",
    },
    {
      src: "/api/placeholder/300/200",
      caption: "Field visit and practical training",
      event: "On-site Training",
    },
  ];

  const resources = [
    {
      title: "Farming Calendar 2025",
      description: "Seasonal farming guide for Bihar",
      type: "PDF",
      size: "2.5 MB",
      downloads: 1245,
    },
    {
      title: "Pest Identification Guide",
      description: "Visual guide to common pests",
      type: "PDF",
      size: "5.1 MB",
      downloads: 892,
    },
    {
      title: "Soil Testing Manual",
      description: "Complete guide to soil analysis",
      type: "PDF",
      size: "3.2 MB",
      downloads: 756,
    },
    {
      title: "Mobile App User Guide",
      description: "Step-by-step app instructions",
      type: "PDF",
      size: "1.8 MB",
      downloads: 634,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Farmer Help & Resources"
        subtitle="Learn, Grow, and Succeed Together"
        description="Access comprehensive help guides, training materials, and community resources designed to help farmers maximize their success with modern agricultural practices."
        primaryAction={{
          text: "Browse Help Topics",
          onClick: () => setActiveTab("help"),
        }}
        secondaryAction={{
          text: "Contact Support",
          onClick: () => navigate("/contact"),
        }}
      />

      {/* Quick Support */}
      <section className="py-16 bg-white border-b">
        <div className="container-max section-padding">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <Card
              className="card-agri cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => navigate("/chatbot")}
            >
              <CardContent className="p-6">
                <MessageCircle className="w-8 h-8 text-agri-primary mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  AI Assistant
                </h3>
                <p className="text-sm text-gray-600">
                  Get instant answers in Hindi, Marathi, or English
                </p>
              </CardContent>
            </Card>

            <Card
              className="card-agri cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => window.open("tel:+919631157174")}
            >
              <CardContent className="p-6">
                <Phone className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Expert Helpline
                </h3>
                <p className="text-sm text-gray-600">
                  Call +91 9631157174 for direct support
                </p>
              </CardContent>
            </Card>

            <Card
              className="card-agri cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => navigate("/contact")}
            >
              <CardContent className="p-6">
                <Calendar className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Schedule Visit
                </h3>
                <p className="text-sm text-gray-600">
                  Book a field visit from our experts
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="help" className="flex items-center space-x-2">
                <Book className="w-4 h-4" />
                <span>Help Topics</span>
              </TabsTrigger>
              <TabsTrigger
                value="training"
                className="flex items-center space-x-2"
              >
                <Users className="w-4 h-4" />
                <span>Training</span>
              </TabsTrigger>
              <TabsTrigger
                value="gallery"
                className="flex items-center space-x-2"
              >
                <Camera className="w-4 h-4" />
                <span>Gallery</span>
              </TabsTrigger>
              <TabsTrigger
                value="resources"
                className="flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Resources</span>
              </TabsTrigger>
            </TabsList>

            {/* Help Topics */}
            <TabsContent value="help" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Help Topics
                </h2>
                <p className="text-lg text-gray-600">
                  Browse our comprehensive guides and tutorials
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {helpTopics.map((topic, index) => (
                  <Card key={index} className="card-agri">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{topic.icon}</span>
                        <CardTitle className="text-lg">{topic.title}</CardTitle>
                      </div>
                      <p className="text-gray-600 text-sm">
                        {topic.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {topic.articles.map((article, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-600 flex items-center space-x-2 cursor-pointer hover:text-agri-primary"
                          >
                            <div className="w-1.5 h-1.5 bg-agri-primary rounded-full"></div>
                            <span>{article}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        variant="outline"
                        className="w-full mt-4 text-agri-primary border-agri-primary hover:bg-agri-primary hover:text-white"
                      >
                        View All Articles
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Training Events */}
            <TabsContent value="training" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Training Sessions
                </h2>
                <p className="text-lg text-gray-600">
                  Past and upcoming training events for farmers
                </p>
              </div>

              <div className="space-y-6">
                {trainingEvents.map((event, index) => (
                  <Card key={index} className="card-agri">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Calendar className="w-5 h-5 text-agri-primary" />
                            <h3 className="text-xl font-semibold text-gray-900">
                              {event.title}
                            </h3>
                          </div>
                          <p className="text-gray-600 mb-3">
                            {event.description}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <span>
                              📅 {new Date(event.date).toLocaleDateString()}
                            </span>
                            <span>📍 {event.location}</span>
                            <span>👥 {event.participants} participants</span>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 md:ml-6">
                          <Button
                            variant="outline"
                            className="text-agri-primary border-agri-primary hover:bg-agri-primary hover:text-white"
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="card-agri bg-blue-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Want to Attend Training?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Register for upcoming training sessions and workshops in
                    your area.
                  </p>
                  <Button
                    onClick={() => navigate("/contact")}
                    className="btn-agri-primary"
                  >
                    Register for Training
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Gallery */}
            <TabsContent value="gallery" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Training Gallery
                </h2>
                <p className="text-lg text-gray-600">
                  Photos from our training sessions and field days
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((image, index) => (
                  <Card key={index} className="card-agri overflow-hidden">
                    <div className="aspect-video bg-gray-200">
                      <img
                        src={image.src}
                        alt={image.caption}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {image.caption}
                      </h4>
                      <p className="text-sm text-gray-600">{image.event}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Resources */}
            <TabsContent value="resources" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Download Resources
                </h2>
                <p className="text-lg text-gray-600">
                  Free guides, manuals, and materials for farmers
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {resources.map((resource, index) => (
                  <Card key={index} className="card-agri">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <Download className="w-5 h-5 text-agri-primary" />
                            <h3 className="font-semibold text-gray-900">
                              {resource.title}
                            </h3>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">
                            {resource.description}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{resource.type}</span>
                            <span>{resource.size}</span>
                            <span>{resource.downloads} downloads</span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-agri-primary border-agri-primary hover:bg-agri-primary hover:text-white"
                        >
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Community Support */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Community Support
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join our growing community of farmers who are transforming
              agriculture with technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-agri text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Farmer Network
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Connect with other farmers in your region to share experiences
                  and learn together.
                </p>
                <Button
                  variant="outline"
                  className="text-green-600 border-green-300 hover:bg-green-100"
                >
                  Join Network
                </Button>
              </CardContent>
            </Card>

            <Card className="card-agri text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Discussion Forum
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Ask questions, share tips, and get advice from experts and
                  fellow farmers.
                </p>
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-300 hover:bg-blue-100"
                >
                  Join Forum
                </Button>
              </CardContent>
            </Card>

            <Card className="card-agri text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Expert Support
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Get direct access to our agricultural experts for personalized
                  guidance.
                </p>
                <Button
                  variant="outline"
                  className="text-purple-600 border-purple-300 hover:bg-purple-100"
                >
                  Contact Expert
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 agri-gradient-bg text-white">
        <div className="container-max section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need More Help?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Our team is here to support you every step of the way. Contact us
            for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/contact")}
              size="lg"
              variant="secondary"
              className="bg-white text-agri-primary hover:bg-gray-100"
            >
              Contact Support Team
            </Button>
            <Button
              onClick={() => navigate("/chatbot")}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-agri-primary"
            >
              Chat with AI Assistant
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FarmerHelp;
