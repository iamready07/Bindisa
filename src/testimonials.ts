export interface Testimonial {
  id: string;
  name: string;
  location: string;
  crop: string;
  story: string;
  yieldImprovement: number;
  beforeYield: number;
  afterYield: number;
  image: string;
  category: "small-farmer" | "medium-farmer" | "large-farmer";
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "राम कुमार",
    location: "गया, बिहार",
    crop: "धान",
    story:
      "बिंदिसा की स्मार्ट खेती तकनीक से मेरी फसल की पैदावार 40% बढ़ गई। अब मैं डेटा के आधार पर निर्णय लेता हूं।",
    yieldImprovement: 40,
    beforeYield: 25,
    afterYield: 35,
    image: "/api/placeholder/150/150",
    category: "small-farmer",
  },
  {
    id: "2",
    name: "सुनीता देवी",
    location: "नालंदा, बिहार",
    crop: "गेहूं",
    story:
      "मिट्टी विश्लेषण की सुविधा से मुझे पता चला कि मेरी मिट्टी में क्या कमी है। अब मेरी फसल पहले से बहुत बेहतर है।",
    yieldImprovement: 35,
    beforeYield: 30,
    afterYield: 40.5,
    image: "/api/placeholder/150/150",
    category: "small-farmer",
  },
  {
    id: "3",
    name: "अजय सिंह",
    location: "पटना, बिहार",
    crop: "मक्का",
    story:
      "बिंदिसा के चैटबॉट से मुझे हिंदी में सभी जानकारी मिल जाती है। मौसम की जानकारी से फसल की बेहतर देखभाल कर पाता हूं।",
    yieldImprovement: 50,
    beforeYield: 20,
    afterYield: 30,
    image: "/api/placeholder/150/150",
    category: "medium-farmer",
  },
  {
    id: "4",
    name: "महेश यादव",
    location: "भागलपुर, बिहार",
    crop: "सब्जी",
    story:
      "IoT सेंसर की मदद से मैं अपनी सिंचाई की मात्रा को नियंत्रित करता हूं। पानी की बचत होती है और फसल भी अच्छी होती है।",
    yieldImprovement: 45,
    beforeYield: 40,
    afterYield: 58,
    image: "/api/placeholder/150/150",
    category: "medium-farmer",
  },
  {
    id: "5",
    name: "विनोद कुमार",
    location: "मुजफ्फरपुर, बिहार",
    crop: "लीची",
    story:
      "बिंदिसा की तकनीक से मेरे लीची के बगीचे में कीट प्रबंधन बहुत आसान हो गया। उत्पादन भी बढ़ा है।",
    yieldImprovement: 55,
    beforeYield: 100,
    afterYield: 155,
    image: "/api/placeholder/150/150",
    category: "large-farmer",
  },
  {
    id: "6",
    name: "कमला देवी",
    location: "सीतामढ़ी, बिहार",
    crop: "आलू",
    story:
      "स्मार्ट खेती से मेरे आलू की गुणवत्ता और मात्रा दोनों में सुधार हुआ है। बाजार में अच्छी कीमत मिलती है।",
    yieldImprovement: 38,
    beforeYield: 50,
    afterYield: 69,
    image: "/api/placeholder/150/150",
    category: "medium-farmer",
  },
];

export const categoryNames = {
  "small-farmer": "छोटे किसान",
  "medium-farmer": "मध्यम किसान",
  "large-farmer": "बड़े किसान",
};

export const getTotalStats = () => {
  const totalFarmers = testimonials.length;
  const avgYieldImprovement = Math.round(
    testimonials.reduce((acc, t) => acc + t.yieldImprovement, 0) / totalFarmers,
  );
  const regionscovered = [
    ...new Set(testimonials.map((t) => t.location.split(", ")[1])),
  ].length;

  return {
    totalFarmers,
    avgYieldImprovement,
    regionscovered,
    cropsSupported: [...new Set(testimonials.map((t) => t.crop))].length,
  };
};
