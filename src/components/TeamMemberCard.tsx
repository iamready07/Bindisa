import React from "react";
import { Linkedin } from "lucide-react";
import { TeamMember } from "../data/teamMembers";

interface TeamMemberCardProps {
  member: TeamMember;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  return (
    <div className="card-agri p-6 text-center group">
      <div className="relative mb-4">
        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-agri-primary to-agri-primary-light rounded-full flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          ) : (
            member.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
          )}
        </div>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-300"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        )}
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {member.name}
      </h3>
      <p className="text-agri-primary font-medium mb-3">{member.role}</p>
      <p className="text-gray-600 text-sm leading-relaxed">
        {member.description}
      </p>

      {/* Category Badge */}
      <div className="mt-4">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
            member.category === "leadership"
              ? "bg-purple-100 text-purple-800"
              : member.category === "tech"
                ? "bg-blue-100 text-blue-800"
                : member.category === "finance"
                  ? "bg-green-100 text-green-800"
                  : member.category === "research"
                    ? "bg-orange-100 text-orange-800"
                    : "bg-gray-100 text-gray-800"
          }`}
        >
          {member.category.charAt(0).toUpperCase() + member.category.slice(1)}
        </span>
      </div>
    </div>
  );
};

export default TeamMemberCard;
