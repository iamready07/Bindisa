import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Filter, Users } from "lucide-react";
import Hero from "../components/Hero";
import TeamMemberCard from "../components/TeamMemberCard";
import { Button } from "../components/ui/button";
import { teamMembers, categoryNames, TeamMember } from "../data/teamMembers";
import { useLanguage } from "../contexts/LanguageContext";

const Team: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredMembers =
    selectedCategory === "all"
      ? teamMembers
      : teamMembers.filter((member) => member.category === selectedCategory);

  const categories = [
    { key: "all", label: "All Team Members", count: teamMembers.length },
    {
      key: "leadership",
      label: categoryNames.leadership,
      count: teamMembers.filter((m) => m.category === "leadership").length,
    },
    {
      key: "tech",
      label: categoryNames.tech,
      count: teamMembers.filter((m) => m.category === "tech").length,
    },
    {
      key: "finance",
      label: categoryNames.finance,
      count: teamMembers.filter((m) => m.category === "finance").length,
    },
    {
      key: "research",
      label: categoryNames.research,
      count: teamMembers.filter((m) => m.category === "research").length,
    },
    {
      key: "operations",
      label: categoryNames.operations,
      count: teamMembers.filter((m) => m.category === "operations").length,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Meet Our Team"
        subtitle="The People Behind the Innovation"
        description="A dynamic team of young professionals with diverse expertise, united by our mission to revolutionize agriculture in India."
        primaryAction={{
          text: "Join Our Team",
          onClick: () => navigate("/contact"),
        }}
        secondaryAction={{
          text: "Our Technology",
          onClick: () => navigate("/technology"),
        }}
      />

      {/* Team Stats */}
      <section className="py-12 bg-white border-b">
        <div className="container-max section-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-agri-primary">11</div>
              <div className="text-gray-600">Team Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-agri-secondary">5</div>
              <div className="text-gray-600">Departments</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">2025</div>
              <div className="text-gray-600">Founded</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-600">100%</div>
              <div className="text-gray-600">Commitment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          {/* Filters */}
          <div className="mb-12">
            <div className="flex items-center space-x-4 mb-6">
              <Filter className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Filter by Department
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

          {/* Team Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">
                No team members found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Leadership Spotlight */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet the visionary leaders who are driving Bindisa Agritech's
              mission to transform agriculture.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers
              .filter((member) => member.category === "leadership")
              .slice(0, 3)
              .map((leader) => (
                <div key={leader.id} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-agri-primary to-agri-primary-light rounded-full flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                      {leader.image ? (
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        leader.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {leader.name}
                  </h3>
                  <p className="text-agri-primary font-medium mb-3">
                    {leader.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
                    {leader.description}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Team Culture */}
      <section className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Team Culture
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At Bindisa Agritech, we believe that diverse perspectives and
                collaborative teamwork are the keys to innovation and success.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-agri-primary rounded-full mt-3"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Collaborative Innovation
                    </h4>
                    <p className="text-gray-600 text-sm">
                      We work together to develop creative solutions for
                      agricultural challenges.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-agri-secondary rounded-full mt-3"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Continuous Learning
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Our team is committed to staying at the forefront of
                      agricultural technology.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-3"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Farmer-Centric Approach
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Every decision we make is guided by our commitment to
                      helping farmers succeed.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-3"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Sustainable Impact
                    </h4>
                    <p className="text-gray-600 text-sm">
                      We're dedicated to creating solutions that benefit both
                      farmers and the environment.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => navigate("/about")}
                className="btn-agri-primary"
              >
                Learn About Our Mission
              </Button>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-agri-primary/20 to-agri-secondary/20 rounded-2xl p-8 flex flex-col justify-center">
                <div className="text-center">
                  <Users className="w-16 h-16 text-agri-primary mx-auto mb-6" />
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Join Our Team
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Are you passionate about agriculture and technology? We're
                    always looking for talented individuals to join our mission.
                  </p>
                  <Button
                    onClick={() => navigate("/contact")}
                    variant="outline"
                    className="border-agri-primary text-agri-primary hover:bg-agri-primary hover:text-white"
                  >
                    Get in Touch
                  </Button>
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
            Want to Work With Us?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join our dynamic team and help us revolutionize agriculture for
            farmers across India.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/contact")}
              size="lg"
              variant="secondary"
              className="bg-white text-agri-primary hover:bg-gray-100"
            >
              Send Your Resume
            </Button>
            <Button
              onClick={() => navigate("/about")}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-agri-primary"
            >
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;
