export interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  category: "leadership" | "tech" | "finance" | "research" | "operations";
  image?: string;
  linkedin?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Mr. Aditya Prakash",
    role: "President",
    description:
      "Leading the company's future and taking all the important decisions.",
    category: "leadership",
    image: "/api/placeholder/300/300",
  },
  {
    id: "2",
    name: "Mr. Aaditya Kumar Sinha",
    role: "Director",
    description:
      "Instrumental in steering the company's vision and strategic direction.",
    category: "leadership",
    image: "/api/placeholder/300/300",
  },
  {
    id: "3",
    name: "Mr. Rajeev",
    role: "Managing Director",
    description: "Management of all the domains and work.",
    category: "leadership",
    image: "/api/placeholder/300/300",
  },
  {
    id: "4",
    name: "Mr. Hardik Yadav",
    role: "Co-founder",
    description: "Focusing on finance and business development.",
    category: "finance",
    image: "/api/placeholder/300/300",
  },
  {
    id: "5",
    name: "Gitanjali Kumari",
    role: "Co-founder",
    description:
      "Passionate about bridging technology and real-world agricultural challenges.",
    category: "tech",
    image: "/api/placeholder/300/300",
  },
  {
    id: "6",
    name: "Mr. Animesh Singh",
    role: "Tech Head",
    description:
      "Focuses on the technical details of the newly found technologies to get it more effective.",
    category: "tech",
    image: "/api/placeholder/300/300",
  },
  {
    id: "7",
    name: "Shreya Chauhan",
    role: "Research Head",
    description:
      "Key team member involved in research and development, and operational strategies.",
    category: "research",
    image: "/api/placeholder/300/300",
  },
  {
    id: "8",
    name: "Mr. Roshan Gupta",
    role: "Business Analyst",
    description: "Contributing to data-driven decision-making processes.",
    category: "operations",
    image: "/api/placeholder/300/300",
  },
  {
    id: "9",
    name: "Mr. Pranjal Singh",
    role: "Operational Head",
    description:
      "Execution of company strategies, ensuring smooth coordination across departments.",
    category: "operations",
    image: "/api/placeholder/300/300",
  },
  {
    id: "10",
    name: "Mr. Aryan",
    role: "Operational Head",
    description:
      "Execution of company strategies, ensuring smooth coordination across departments.",
    category: "operations",
    image: "/api/placeholder/300/300",
  },
  {
    id: "11",
    name: "Mr. Nikhil Nischal",
    role: "Finance Head",
    description: "Manages all the financial measures for the company.",
    category: "finance",
    image: "/api/placeholder/300/300",
  },
  {
    id: "12",
    name: "Aditya Deshmukh",
    role: "Web Development Lead",
    description:
      "Leading web development initiatives and creating digital solutions for modern agriculture.",
    category: "tech",
    image: "/api/placeholder/300/300",
  },
];

export const categoryNames = {
  leadership: "Leadership",
  tech: "Technology",
  finance: "Finance",
  research: "Research",
  operations: "Operations",
};
