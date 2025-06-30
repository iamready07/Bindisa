import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, TrendingUp, MapPin, Award, Filter } from "lucide-react";
import Hero from "../components/Hero";
import TestimonialCard from "../components/TestimonialCard";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  testimonials,
  categoryNames,
  getTotalStats,
} from "../data/testimonials";
import { useLanguage } from "../contexts/LanguageContext";

const SuccessStories: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const stats = getTotalStats();

  const filteredTestimonials =
    selectedCategory === "all"
      ? testimonials
      : testimonials.filter(
          (testimonial) => testimonial.category === selectedCategory,
        );

  const categories = [
    { key: "all", label: "सभी किसान", count: testimonials.length },
    {
      key: "small-farmer",
      label: categoryNames["small-farmer"],
      count: testimonials.filter((t) => t.category === "small-farmer").length,
    },
    {
      key: "medium-farmer",
      label: categoryNames["medium-farmer"],
      count: testimonials.filter((t) => t.category === "medium-farmer").length,
    },
    {
      key: "large-farmer",
      label: categoryNames["large-farmer"],
      count: testimonials.filter((t) => t.category === "large-farmer").length,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Success Stories"
        subtitle="Real Farmers, Real Results"
        description="Discover how Bindisa Agritech's technology has transformed the lives and livelihoods of farmers across Bihar, increasing yields and improving agricultural practices."
        primaryAction={{
          text: "Try Our Technology",
          onClick: () => navigate("/soil-analysis"),
        }}
        secondaryAction={{
          text: "Contact Us",
          onClick: () => navigate("/contact"),
        }}
      />

      {/* Impact Statistics */}
      <section className="py-16 bg-white border-b">
        <div className="container-max section-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <Users className="w-8 h-8 text-agri-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900">
                {stats.totalFarmers}
              </div>
              <div className="text-gray-600">Farmers Helped</div>
            </div>
            <div>
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900">
                {stats.avgYieldImprovement}%
              </div>
              <div className="text-gray-600">Avg. Yield Increase</div>
            </div>
            <div>
              <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900">
                {stats.regionscovered}
              </div>
              <div className="text-gray-600">Regions Covered</div>
            </div>
            <div>
              <Award className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900">
                {stats.cropsSupported}
              </div>
              <div className="text-gray-600">Crops Supported</div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          {/* Filters */}
          <div className="mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <Filter className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Filter by Farmer Category
              </h3>
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category.key}
                  variant={
                    selectedCategory === category.key ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category.key)}
                  className={`${
                    selectedCategory === category.key
                      ? "bg-agri-primary hover:bg-agri-primary-dark"
                      : "border-gray-300 hover:border-agri-primary hover:text-agri-primary"
                  }`}
                >
                  {category.label}
                  <span className="ml-2 px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full">
                    {category.count}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          {filteredTestimonials.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                No success stories found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Success Story */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Success Story
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet Ram Kumar from Gaya, Bihar, whose farming transformation
              inspired our mission.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="card-agri p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-agri-primary to-agri-primary-light rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    रा
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      राम कुमार
                    </h3>
                    <p className="text-agri-primary font-medium">गया, बिहार</p>
                    <p className="text-sm text-gray-600">धान किसान</p>
                  </div>
                </div>

                <blockquote className="text-lg text-gray-700 italic mb-6 leading-relaxed">
                  "बिंदिसा की स्मार्ट खेती तकनीक से मेरी फसल की पैदावार 40% बढ़
                  गई। अब मैं डेटा के आधार पर निर्णय लेता हूं और मेरी आर्थिक
                  स्थिति में सुधार हुआ है।"
                </blockquote>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gray-900">25</div>
                    <div className="text-sm text-gray-600">पहले (क्विंटल)</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-700">35</div>
                    <div className="text-sm text-gray-600">
                      बाद में (क्विंटल)
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-700">40%</div>
                    <div className="text-sm text-gray-600">वृद्धि</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                How We Helped
              </h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Soil Analysis
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Conducted comprehensive soil testing to understand
                      nutrient deficiencies and pH levels.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Smart Irrigation
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Implemented IoT sensors for optimal water management and
                      irrigation scheduling.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Crop Monitoring
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Provided real-time crop health monitoring and disease
                      prediction alerts.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Market Insights
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Delivered market price forecasts and optimal selling time
                      recommendations.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => navigate("/technology")}
                className="btn-agri-primary w-full"
              >
                Learn About Our Technology
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Impact Across Bihar
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our technology is making a difference in farming communities
              across different regions of Bihar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-agri text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Gaya Region</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Our primary operational area with the highest concentration of
                  beneficiary farmers.
                </p>
                <div className="text-2xl font-bold text-blue-600">3</div>
                <div className="text-sm text-gray-600">Success Stories</div>
              </CardContent>
            </Card>

            <Card className="card-agri text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Nalanda & Patna</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Expanding our reach to help farmers in nearby districts with
                  similar agricultural challenges.
                </p>
                <div className="text-2xl font-bold text-green-600">2</div>
                <div className="text-sm text-gray-600">Success Stories</div>
              </CardContent>
            </Card>

            <Card className="card-agri text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Other Districts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Growing presence in Bhagalpur, Muzaffarpur, and Sitamarhi
                  districts.
                </p>
                <div className="text-2xl font-bold text-purple-600">1</div>
                <div className="text-sm text-gray-600">Success Stories</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 agri-gradient-bg text-white">
        <div className="container-max section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of farmers who have already transformed their
            agricultural practices with our technology.
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
              Ask Our AI Assistant
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStories;
