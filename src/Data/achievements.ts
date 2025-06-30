export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: "recognition" | "engagement" | "initiative" | "collaboration";
  image?: string;
  details?: string;
}

export const achievements: Achievement[] = [
  {
    id: "1",
    title: "Government Recognition",
    description:
      "Received a Letter of Appreciation from the Hon'ble Minister of Micro, Small and Medium Enterprises, Shri Jitan Ram Manjhi",
    date: "2025-03-15",
    category: "recognition",
    image: "/api/placeholder/400/300",
    details:
      "Acknowledging innovative contributions to agriculture and commitment to empowering farmers with cutting-edge technology.",
  },
  {
    id: "2",
    title: "High-Level Agricultural Discussions",
    description:
      "Engaged in discussions with Shri Shivraj Singh Chouhan, Hon'ble Minister of Agriculture",
    date: "2025-02-28",
    category: "engagement",
    image: "/api/placeholder/400/300",
    details:
      "Focusing on the future of Indian agriculture and the role of innovation in transforming farming practices.",
  },
  {
    id: "3",
    title: "Bihar Diwas Celebration",
    description:
      "Celebrated Bihar Diwas, emphasizing commitment to empowering local farmers",
    date: "2025-03-22",
    category: "initiative",
    image: "/api/placeholder/400/300",
    details:
      "Demonstrating our dedication to the agricultural community of Bihar and promoting technological advancement in farming.",
  },
  {
    id: "4",
    title: "Strategic Collaboration with Krishi Tantra",
    description:
      'Working on collaboration with prestigious agri-based company "Krishi Tantra"',
    date: "2025-04-10",
    category: "collaboration",
    image: "/api/placeholder/400/300",
    details:
      "Looking forward toward emphasizing the field of agriculture with innovation and technologies through strategic partnerships.",
  },
  {
    id: "5",
    title: "Company Incorporation",
    description: "Successfully incorporated Bindisa Agritech Pvt. Ltd.",
    date: "2025-02-17",
    category: "recognition",
    image: "/api/placeholder/400/300",
    details:
      "Officially established as a non-government private company in Gaya, Bihar with CIN: U46539BR2025PTC073688.",
  },
];

export const categoryNames = {
  recognition: "Recognition & Awards",
  engagement: "Government Engagement",
  initiative: "Community Initiatives",
  collaboration: "Strategic Collaborations",
};
