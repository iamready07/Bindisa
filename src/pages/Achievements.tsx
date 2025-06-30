import React from "react";
import { useNavigate } from "react-router-dom";
import { Award, Calendar, Users, Building } from "lucide-react";
import Hero from "../components/Hero";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { achievements, categoryNames } from "../data/achievements";

const Achievements: React.FC = () => {
  const navigate = useNavigate();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "recognition":
        return <Award className="w-5 h-5" />;
      case "engagement":
        return <Users className="w-5 h-5" />;
      case "initiative":
        return <Calendar className="w-5 h-5" />;
      case "collaboration":
        return <Building className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "recognition":
        return "bg-yellow-100 text-yellow-600 border-yellow-200";
      case "engagement":
        return "bg-blue-100 text-blue-600 border-blue-200";
      case "initiative":
        return "bg-green-100 text-green-600 border-green-200";
      case "collaboration":
        return "bg-purple-100 text-purple-600 border-purple-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Our Achievements"
        subtitle="Recognition and Milestones"
        description="Despite being a nascent company, Bindisa Agritech has garnered significant attention and recognition for our innovative contributions to agriculture and commitment to empowering farmers."
        primaryAction={{
          text: "View Our Work",
          onClick: () => navigate("/technology"),
        }}
        secondaryAction={{
          text: "Contact Us",
          onClick: () => navigate("/contact"),
        }}
      />

      {/* Overview Stats */}
      <section className="py-16 bg-white border-b">
        <div className="container-max section-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <Award className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900">
                {achievements.length}
              </div>
              <div className="text-gray-600">Total Achievements</div>
            </div>
            <div>
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900">2</div>
              <div className="text-gray-600">Gov. Recognitions</div>
            </div>
            <div>
              <Calendar className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900">3</div>
              <div className="text-gray-600">Months Since Launch</div>
            </div>
            <div>
              <Building className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900">1</div>
              <div className="text-gray-600">Strategic Partnership</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Journey of Recognition
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A chronological view of our achievements and milestones since our
              incorporation in February 2025.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 hidden md:block"></div>

              {/* Timeline items */}
              <div className="space-y-8">
                {achievements
                  .sort(
                    (a, b) =>
                      new Date(a.date).getTime() - new Date(b.date).getTime(),
                  )
                  .map((achievement, index) => (
                    <div
                      key={achievement.id}
                      className="relative flex items-start space-x-6"
                    >
                      {/* Timeline dot */}
                      <div className="hidden md:flex w-16 h-16 bg-white rounded-full border-4 border-agri-primary flex-shrink-0 items-center justify-center shadow-lg">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${getCategoryColor(achievement.category)}`}
                        >
                          {getCategoryIcon(achievement.category)}
                        </div>
                      </div>

                      {/* Content */}
                      <Card className="card-agri flex-1">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <div
                                  className={`md:hidden w-8 h-8 rounded-lg flex items-center justify-center ${getCategoryColor(achievement.category)}`}
                                >
                                  {getCategoryIcon(achievement.category)}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                  {achievement.title}
                                </h3>
                              </div>
                              <p className="text-gray-600 mb-3">
                                {achievement.description}
                              </p>
                              {achievement.details && (
                                <p className="text-sm text-gray-500 leading-relaxed">
                                  {achievement.details}
                                </p>
                              )}
                            </div>
                            <div className="md:ml-6 mt-4 md:mt-0">
                              <div className="text-right">
                                <div className="text-sm font-medium text-agri-primary">
                                  {new Date(
                                    achievement.date,
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </div>
                                <div
                                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-2 border ${getCategoryColor(achievement.category)}`}
                                >
                                  {
                                    categoryNames[
                                      achievement.category as keyof typeof categoryNames
                                    ]
                                  }
                                </div>
                              </div>
                            </div>
                          </div>

                          {achievement.image && (
                            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                              <img
                                src={achievement.image}
                                alt={achievement.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recognition Categories */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Categories of Recognition
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our achievements span across multiple categories, showcasing our
              comprehensive impact on agriculture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(categoryNames).map(([key, name]) => {
              const categoryAchievements = achievements.filter(
                (a) => a.category === key,
              );
              return (
                <Card
                  key={key}
                  className={`card-agri border-2 ${getCategoryColor(key)}`}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${getCategoryColor(key)}`}
                    >
                      {getCategoryIcon(key)}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{name}</h3>
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      {categoryAchievements.length}
                    </div>
                    <p className="text-sm text-gray-600">
                      {categoryAchievements.length === 1
                        ? "Achievement"
                        : "Achievements"}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Government Letter */}
      <section className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Government Recognition Letter
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Letter of Appreciation from Hon'ble Minister Shri Jitan Ram Manjhi
              acknowledging our innovative contributions to agriculture.
            </p>
          </div>

          <Card className="card-agri max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-8 border-2 border-yellow-200">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Letter of Appreciation
                  </h3>
                  <p className="text-gray-600">
                    From the Office of Hon'ble Minister of MSME
                  </p>
                </div>

                <div className="space-y-4 text-gray-700">
                  <p className="italic text-center">
                    "I am delighted to know that M/s Bindisa Agritech Pvt. Ltd
                    has been doing praiseworthy work in the field of Agriculture
                    which is going to improve the life of millions of farmers of
                    our country, particularly the underprivileged farmers."
                  </p>

                  <p className="text-center">
                    "I find that the company envision a future where technology
                    and agriculture meet at a point to create a sustainable,
                    prosperous and dignified life for farmers."
                  </p>

                  <div className="text-center pt-4 border-t border-yellow-300">
                    <p className="font-semibold">Shri Jitan Ram Manjhi</p>
                    <p className="text-sm">
                      Hon'ble Minister of Micro, Small and Medium Enterprises
                    </p>
                    <p className="text-sm">Government of India</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 agri-gradient-bg text-white">
        <div className="container-max section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Be Part of Our Success Story
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join us in our mission to revolutionize agriculture and create more
            success stories together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/contact")}
              size="lg"
              variant="secondary"
              className="bg-white text-agri-primary hover:bg-gray-100"
            >
              Partner With Us
            </Button>
            <Button
              onClick={() => navigate("/success-stories")}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-agri-primary"
            >
              Read Success Stories
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Achievements;
