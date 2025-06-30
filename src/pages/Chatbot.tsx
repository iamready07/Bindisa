import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Send, Bot, User, Globe, Mic, Volume2 } from "lucide-react";
import Hero from "../components/Hero";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useLanguage } from "../contexts/LanguageContext";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        language === "hi"
          ? "नमस्ते! मैं बिंदिसा एग्रीटेक का कृषि सहायक हूं। मैं आपकी खेती संबंधी समस्याओं में मदद कर सकता हूं। आप मुझसे क्या पूछना चाहते हैं?"
          : language === "mr"
            ? "नमस्कार! मी बिंदिसा एग्रीटेकचा कृषी सहाय्यक आहे। मी तुमच्या शेतीच्या समस्यांमध्ये मदत करू शकतो. तुम्हाला काय विचारायचे आहे?"
            : "Hello! I am Bindisa Agritech's agricultural assistant. I can help you with farming-related queries. What would you like to ask?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sampleQuestions = {
    hi: [
      "मेरी फसल में कीट लग गए हैं, क्या करूं?",
      "मिट्टी की जांच कैसे करें?",
      "बारिश के बाद क्या सावधानी बरतें?",
      "उर्वरक की सही मात्रा क्या है?",
      "फसल कब काटनी चाहिए?",
    ],
    mr: [
      "माझ्या पिकाला कीड लागले आहेत, काय करावे?",
      "मातीची तपासणी कशी करावी?",
      "पावसानंतर काय काळजी घ्यावी?",
      "खताचे योग्य प्रमाण काय आहे?",
      "पीक कधी कापावे?",
    ],
    en: [
      "My crops have pest infestation, what should I do?",
      "How to test soil quality?",
      "What precautions after rainfall?",
      "What is the right amount of fertilizer?",
      "When should I harvest the crop?",
    ],
  };

  const getResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    if (language === "hi") {
      if (lowerQuery.includes("कीट") || lowerQuery.includes("पेस्ट")) {
        return "कीट प्रबंधन के लिए: 1) नीम का तेल स्प्रे करें 2) जैविक कीटनाशक का उपयोग करें 3) फसल चक्र अपनाएं 4) साफ-सफाई रखें। अधिक जानकारी के लिए हमारे विशेषज्ञों से संपर्क करें।";
      }
      if (lowerQuery.includes("मिट्टी") || lowerQuery.includes("soil")) {
        return "मिट्टी की जांच के लिए: 1) pH मीटर से pH चेक करें 2) नमी का स्तर देखें 3) NPK टेस्ट कराएं 4) हमारा सॉयल एनालिसिस टूल इस्तेमाल करें। क्या आप हमारा टूल आजमाना चाहेंगे?";
      }
      if (lowerQuery.includes("बारिश") || lowerQuery.includes("पानी")) {
        return "बारिश के बाद: 1) खेत से अतिरिक्त पानी निकालें 2) फंगस के लिए दवा छिड़कें 3) पौधों को सहारा दें 4) मिट्टी की नमी चेक करें। नियमित निगरानी जरूरी है।";
      }
      if (lowerQuery.includes("उर्वरक") || lowerQuery.includes("खाद")) {
        return "उर्वरक की मात्रा फसल के अनुसार तय करें: 1) धान - 120:60:40 NPK प्रति हेक्टेयर 2) गेहूं - 150:75:50 NPK प्रति हेक्टेयर 3) मिट्टी टेस्ट के आधार पर समायोजन करें।";
      }
      return "आपका प्रश्न दिलचस्प है। कृपया अधिक विस्तार से बताएं या हमारे विशेषज्ञों से संपर्क करें। आप हमारे अन्य टूल्स भी आजमा सकते हैं।";
    }

    if (language === "mr") {
      if (lowerQuery.includes("कीड") || lowerQuery.includes("pest")) {
        return "कीड व्यवस्थापनासाठी: 1) नीम तेल फवारा करा 2) जैविक कीटकनाशकाचा वापर करा 3) पीक चक्र अवलंबा 4) स्वच्छता ठेवा. अधिक माहितीसाठी आमच्या तज्ञांशी संपर्क साधा.";
      }
      if (lowerQuery.includes("माती") || lowerQuery.includes("soil")) {
        return "मातीची तपासणी करण्यासाठी: 1) pH मीटरने pH तपासा 2) ओलावा पातळी पहा 3) NPK चाचणी करा 4) आमचे सॉयल एनालिसिस टूल वापरा. तुम्हाला आमचे टूल वापरायचे आहे का?";
      }
      return "तुमचा प्रश्न मनोरंजक आहे. कृपया अधिक तपशीलाने सांगा किंवा आमच्या तज्ञांशी संपर्क साधा.";
    }

    // English responses
    if (lowerQuery.includes("pest") || lowerQuery.includes("insect")) {
      return "For pest management: 1) Apply neem oil spray 2) Use biological pesticides 3) Practice crop rotation 4) Maintain field hygiene. Contact our experts for detailed guidance.";
    }
    if (lowerQuery.includes("soil") || lowerQuery.includes("test")) {
      return "For soil testing: 1) Check pH with pH meter 2) Monitor moisture levels 3) Test NPK levels 4) Use our Soil Analysis tool. Would you like to try our analysis tool?";
    }
    if (lowerQuery.includes("rain") || lowerQuery.includes("water")) {
      return "After rainfall: 1) Drain excess water 2) Apply fungicide spray 3) Provide plant support 4) Monitor soil moisture. Regular monitoring is essential.";
    }
    if (lowerQuery.includes("fertilizer") || lowerQuery.includes("nutrient")) {
      return "Fertilizer amounts vary by crop: 1) Rice - 120:60:40 NPK per hectare 2) Wheat - 150:75:50 NPK per hectare 3) Adjust based on soil test results.";
    }

    return "That's an interesting question! Please provide more details or contact our experts. You can also try our other agricultural tools.";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: getResponse(inputMessage),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuestionClick = (question: string) => {
    setInputMessage(question);
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="AI Agricultural Assistant"
        subtitle="Get Instant Farming Advice in Your Language"
        description="Chat with our multilingual AI assistant to get personalized advice on crops, soil, weather, and farming practices. Available in Hindi, Marathi, and English."
        primaryAction={{
          text: "Start Chatting",
          onClick: () =>
            document
              .getElementById("chatbot-interface")
              ?.scrollIntoView({ behavior: "smooth" }),
        }}
        secondaryAction={{
          text: "Analyze Soil",
          onClick: () => navigate("/soil-analysis"),
        }}
      />

      {/* Features */}
      <section className="py-16 bg-white border-b">
        <div className="container-max section-padding">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <Globe className="w-8 h-8 text-agri-primary mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Multilingual Support
              </h3>
              <p className="text-sm text-gray-600">
                Chat in Hindi, Marathi, or English
              </p>
            </div>
            <div>
              <Bot className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">AI-Powered</h3>
              <p className="text-sm text-gray-600">
                Advanced algorithms for accurate advice
              </p>
            </div>
            <div>
              <Volume2 className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Voice Support
              </h3>
              <p className="text-sm text-gray-600">
                Ask questions using voice commands
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot Interface */}
      <section id="chatbot-interface" className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Sample Questions */}
              <div className="lg:col-span-1">
                <Card className="card-agri h-fit">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Globe className="w-5 h-5 text-agri-primary" />
                      <span>Sample Questions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Language Selector */}
                    <div className="mb-4">
                      <Select
                        value={language}
                        onValueChange={(value: any) => setLanguage(value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">हिंदी</SelectItem>
                          <SelectItem value="mr">मराठी</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Questions */}
                    <div className="space-y-2">
                      {sampleQuestions[language].map((question, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuestionClick(question)}
                          className="w-full text-left p-3 text-sm bg-gray-50 hover:bg-agri-accent rounded-lg transition-colors duration-200"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Chat Interface */}
              <div className="lg:col-span-2">
                <Card className="card-agri h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Bot className="w-5 h-5 text-agri-primary" />
                      <span>Agricultural Assistant</span>
                      <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        Online
                      </span>
                    </CardTitle>
                  </CardHeader>

                  {/* Messages */}
                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${message.type === "user" ? "bg-agri-primary" : "bg-gray-200"}`}
                            >
                              {message.type === "user" ? (
                                <User className="w-4 h-4 text-white" />
                              ) : (
                                <Bot className="w-4 h-4 text-gray-600" />
                              )}
                            </div>
                            <div
                              className={`p-3 rounded-lg ${message.type === "user" ? "bg-agri-primary text-white" : "bg-gray-100 text-gray-900"}`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <span className="text-xs opacity-70">
                                {message.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}

                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="flex items-start space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <Bot className="w-4 h-4 text-gray-600" />
                            </div>
                            <div className="bg-gray-100 p-3 rounded-lg">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div
                                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                ></div>
                                <div
                                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Input */}
                    <div className="flex space-x-2">
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder={
                          language === "hi"
                            ? "अपना सवाल यहाँ लिखें..."
                            : language === "mr"
                              ? "तुमचा प्रश्न इथे लिहा..."
                              : "Type your question here..."
                        }
                        onKeyPress={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                        className="flex-1"
                      />
                      <Button
                        onClick={handleSendMessage}
                        className="btn-agri-primary"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Mic className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Helps */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Our AI Assistant Helps
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get instant, personalized agricultural advice powered by advanced
              AI and years of farming expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Bot className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Instant Answers
              </h3>
              <p className="text-sm text-gray-600">
                Get immediate responses to your farming questions 24/7
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Local Language
              </h3>
              <p className="text-sm text-gray-600">
                Communicate in Hindi, Marathi, or English
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Volume2 className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Voice Support
              </h3>
              <p className="text-sm text-gray-600">
                Ask questions using voice commands for easier interaction
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Send className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Expert Knowledge
              </h3>
              <p className="text-sm text-gray-600">
                Backed by agricultural expertise and best practices
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 agri-gradient-bg text-white">
        <div className="container-max section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need More Detailed Assistance?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            For complex agricultural challenges, connect with our human experts
            or try our advanced analysis tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/contact")}
              size="lg"
              variant="secondary"
              className="bg-white text-agri-primary hover:bg-gray-100"
            >
              Contact Experts
            </Button>
            <Button
              onClick={() => navigate("/soil-analysis")}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-agri-primary"
            >
              Try Soil Analysis
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Chatbot;
