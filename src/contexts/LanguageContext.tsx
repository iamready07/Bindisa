import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi" | "mr";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About",
    "nav.team": "Team",
    "nav.technology": "Technology",
    "nav.success": "Success Stories",
    "nav.soil": "Soil Analysis",
    "nav.chatbot": "Chatbot",
    "nav.contact": "Contact",
    "nav.login": "Login",
    "nav.register": "Register",

    // Hero Section
    "hero.tagline": "INNOVATE. CULTIVATE. ELEVATE.",
    "hero.subtitle": "Revolutionizing Agriculture with Innovation & Technology",
    "hero.description":
      "At Bindisa Agritech, we are on a mission to transform agriculture by integrating cutting-edge technology, data-driven insights, and sustainable practices.",
    "hero.cta": "Explore Our Work",
    "hero.learn-more": "Learn More",

    // Common
    "common.read-more": "Read More",
    "common.contact-us": "Contact Us",
    "common.get-started": "Get Started",
    "common.learn-more": "Learn More",
    "common.phone": "Phone",
    "common.email": "Email",
    "common.address": "Address",
    "common.follow-us": "Follow Us",

    // About
    "about.title": "About Bindisa Agritech",
    "about.subtitle": "Empowering Farmers with Smart Technology",
    "about.mission": "Our Mission",
    "about.vision": "Our Vision",
    "about.values": "Our Values",
    "about.name-origin":
      "The \"Bindisa\" name honors the founder's family—BINdi, DIpa, and SAntosh—representing the company's roots in family values, innovation, and influence.",

    // Technology
    "tech.smart-farming": "Smart Farming & Precision Agriculture",
    "tech.disaster-forecasting": "Disaster Forecasting & Resilience",
    "tech.climate-smart": "Sustainable & Climate-Smart Practices",
    "tech.data-driven": "Data-Driven Decision Making",

    // Contact
    "contact.title": "Get in Touch",
    "contact.subtitle": "We'd love to hear from you",
    "contact.name": "Name",
    "contact.phone": "Phone",
    "contact.message": "Message",
    "contact.send": "Send Message",
    "contact.address-title": "Our Office",
    "contact.gaya-address": "Gaya, Bihar, India, 823001",

    // Footer
    "footer.tagline":
      "Revolutionizing agriculture through innovation and technology",
    "footer.quick-links": "Quick Links",
    "footer.contact-info": "Contact Info",
    "footer.rights": "© 2025 Bindisa Agritech Pvt. Ltd. All rights reserved.",
  },
  hi: {
    // Navigation
    "nav.home": "होम",
    "nav.about": "हमारे बारे में",
    "nav.team": "टीम",
    "nav.technology": "तकनीक",
    "nav.success": "सफलता की कहानियां",
    "nav.soil": "मिट्टी विश्लेषण",
    "nav.chatbot": "चैटबॉट",
    "nav.contact": "संपर्क",
    "nav.login": "लॉगिन",
    "nav.register": "पंजीकरण",

    // Hero Section
    "hero.tagline": "नवाचार। खेती। उन्नति।",
    "hero.subtitle": "नवाचार और प्रौद्योगिकी के साथ कृषि में क्रांति",
    "hero.description":
      "बिंदिसा एग्रीटेक में, हम अत्याधुनिक तकनीक, डेटा-आधारित अंतर्दृष्टि और टिकाऊ प्रथाओं को एकीकृत करके कृषि को बदलने के मिशन पर हैं।",
    "hero.cta": "हमारा काम देखें",
    "hero.learn-more": "और जानें",

    // Common
    "common.read-more": "और पढ़ें",
    "common.contact-us": "संपर्क करें",
    "common.get-started": "शुरू करें",
    "common.learn-more": "और जानें",
    "common.phone": "फ़ोन",
    "common.email": "ईमेल",
    "common.address": "पता",
    "common.follow-us": "हमें फॉलो करें",

    // About
    "about.title": "बिंदिसा एग्रीटेक के बारे में",
    "about.subtitle": "स्मार्ट प्रौद्योगिकी के साथ किसानों को सशक्त बनाना",
    "about.mission": "हमारा मिशन",
    "about.vision": "हमारी दृष्टि",
    "about.values": "हमारे मूल्य",
    "about.name-origin":
      '"बिंदिसा" नाम संस्थापक के परिवार—बिंदी, दीपा, और संतोष—का सम्मान करता है, जो कंपनी की पारिवारिक मूल्यों, नवाचार और प्रभाव में जड़ों का प्रतिनिधित्व करता है।',

    // Technology
    "tech.smart-farming": "स्मार्ट खेती और सटीक कृषि",
    "tech.disaster-forecasting": "आपदा पूर्वानुमान औ�� लचीलापन",
    "tech.climate-smart": "टिकाऊ और जलवायु-स्मार्ट प्रथाएं",
    "tech.data-driven": "डेटा-आधारित निर्णय लेना",

    // Contact
    "contact.title": "संपर्क में रहें",
    "contact.subtitle": "हमें आपसे सुनना अच्छा लगेगा",
    "contact.name": "नाम",
    "contact.phone": "फ़ोन",
    "contact.message": "संदेश",
    "contact.send": "संदेश भेजें",
    "contact.address-title": "हमारा कार्यालय",
    "contact.gaya-address": "गया, बिहार, भारत, 823001",

    // Footer
    "footer.tagline": "नवाचार और प्रौद्योगिकी के माध्यम से कृषि में क्रांति",
    "footer.quick-links": "त्वरित लिंक",
    "footer.contact-info": "संपर्क जानकारी",
    "footer.rights":
      "© 2025 बिंदिसा एग्रीटेक प्राइवेट लिमिटेड। सभी अधिकार सुरक्षित।",
  },
  mr: {
    // Navigation
    "nav.home": "मुख्य",
    "nav.about": "आमच्याबद्दल",
    "nav.team": "टीम",
    "nav.technology": "तंत्रज्ञान",
    "nav.success": "यशाच्या गोष्टी",
    "nav.soil": "माती विश्लेषण",
    "nav.chatbot": "चॅटबॉट",
    "nav.contact": "संपर्क",
    "nav.login": "लॉगिन",
    "nav.register": "नोंदणी",

    // Hero Section
    "hero.tagline": "नावीन्य। शेती। प्रगती।",
    "hero.subtitle": "नावीन्य आणि तंत्रज्ञानासह शेतीमध्ये क्रांती",
    "hero.description":
      "बिंदिसा एग्रीटेक मध्ये, आम्ही अत्याधुनिक तंत्रज्ञान, डेटा-आधारित अंतर्दृष्टी आणि शाश्वत पद्धती एकत्रित करून शेती बदलण्याच्या मिशनवर आहोत।",
    "hero.cta": "आमचे काम पहा",
    "hero.learn-more": "अधिक जाणून घ्या",

    // Common
    "common.read-more": "अधिक वाचा",
    "common.contact-us": "संपर्क साधा",
    "common.get-started": "सुरुवात करा",
    "common.learn-more": "अधिक जाणून घ्या",
    "common.phone": "फोन",
    "common.email": "ईमेल",
    "common.address": "पत्ता",
    "common.follow-us": "आम्हाला फॉलो करा",

    // About
    "about.title": "बिंदिसा एग्रीटेकबद्दल",
    "about.subtitle": "स्मार्ट तंत्रज्ञानासह शेतकऱ्यांना सक्षम करणे",
    "about.mission": "आमचे ध्येय",
    "about.vision": "आमची दृष्टी",
    "about.values": "आमची मूल्ये",
    "about.name-origin":
      '"बिंदिसा" हे नाव संस्थापकाच्या कुटुंबाचा—बिंदी, दीपा आणि संतोष—सन्मान करते, जे कंपनीच्या कौटुंबिक मूल्ये, नावीन्य आणि प्रभावातील मुळांचे प्रतिनिधित्व करते।',

    // Technology
    "tech.smart-farming": "स्मार्ट शेती आणि अचूक शेती",
    "tech.disaster-forecasting": "आपत्ती अंदाज आणि लवचिकता",
    "tech.climate-smart": "शाश्वत आणि हवामान-स्मार्ट पद्धती",
    "tech.data-driven": "डेटा-आधारित निर्णय",

    // Contact
    "contact.title": "संपर्कात रहा",
    "contact.subtitle": "आम्हाला तुमच्याकडून ऐकायला आवडेल",
    "contact.name": "नाव",
    "contact.phone": "फोन",
    "contact.message": "संदेश",
    "contact.send": "संदेश पाठवा",
    "contact.address-title": "आमचे कार्यालय",
    "contact.gaya-address": "गया, बिहार, भारत, ८२३००१",

    // Footer
    "footer.tagline": "नावीन्य आणि तंत्रज्ञानाद्वारे शेतीमध्ये क्रांती",
    "footer.quick-links": "द्रुत दुवे",
    "footer.contact-info": "संपर्क माहिती",
    "footer.rights":
      "© २०२५ बिंदिसा एग्रीटेक प्रायव्हेट लिमिटेड. सर्व हक्क राखीव.",
  },
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("bindisa-language") as Language;
    if (savedLanguage && ["en", "hi", "mr"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("bindisa-language", lang);
  };

  const t = (key: string): string => {
    return (
      translations[language][
        key as keyof (typeof translations)[typeof language]
      ] || key
    );
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
