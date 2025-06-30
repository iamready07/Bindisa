import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Beaker,
  Droplets,
  Thermometer,
  Zap,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Leaf,
  ArrowRight,
} from "lucide-react";
import Hero from "../components/Hero";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Slider } from "../components/ui/slider";
import { useLanguage } from "../contexts/LanguageContext";

interface SoilData {
  ph: number;
  moisture: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
}

interface AnalysisResult {
  ph: { status: "good" | "warning" | "critical"; message: string };
  moisture: { status: "good" | "warning" | "critical"; message: string };
  nitrogen: { status: "good" | "warning" | "critical"; message: string };
  phosphorus: { status: "good" | "warning" | "critical"; message: string };
  potassium: { status: "good" | "warning" | "critical"; message: string };
  recommendedCrops: string[];
  recommendations: string[];
}

const SoilAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [soilData, setSoilData] = useState<SoilData>({
    ph: 7.0,
    moisture: 60,
    nitrogen: 50,
    phosphorus: 40,
    potassium: 45,
    temperature: 25,
  });
  const [showResults, setShowResults] = useState(false);

  const analyzeSoil = (data: SoilData): AnalysisResult => {
    const result: AnalysisResult = {
      ph: { status: "good", message: "" },
      moisture: { status: "good", message: "" },
      nitrogen: { status: "good", message: "" },
      phosphorus: { status: "good", message: "" },
      potassium: { status: "good", message: "" },
      recommendedCrops: [],
      recommendations: [],
    };

    // pH Analysis
    if (data.ph < 6.0) {
      result.ph = {
        status: "critical",
        message: "मिट्टी अम्लीय है। चूना डालने की सिफारिश की जाती है।",
      };
    } else if (data.ph > 8.0) {
      result.ph = {
        status: "warning",
        message: "मिट्टी क्षारीय है। गंधक या जिप्सम डालें।",
      };
    } else {
      result.ph = { status: "good", message: "मिट्टी का pH आदर्श है।" };
    }

    // Moisture Analysis
    if (data.moisture < 30) {
      result.moisture = {
        status: "critical",
        message: "मिट्टी में नमी कम है। सिंचाई की आवश्यकता है।",
      };
    } else if (data.moisture > 80) {
      result.moisture = {
        status: "warning",
        message: "मिट्टी में अधिक नमी है। जल निकासी सुधारें।",
      };
    } else {
      result.moisture = {
        status: "good",
        message: "मिट्टी में नमी का स्तर उचित है।",
      };
    }

    // Nitrogen Analysis
    if (data.nitrogen < 30) {
      result.nitrogen = {
        status: "critical",
        message: "नाइट्रोजन की कमी है। यूरिया का प्रयोग करें।",
      };
    } else if (data.nitrogen > 80) {
      result.nitrogen = {
        status: "warning",
        message: "नाइट्रोजन अधिक है। उर्वरक कम करें।",
      };
    } else {
      result.nitrogen = {
        status: "good",
        message: "नाइट्रोजन का स्तर उचित है।",
      };
    }

    // Phosphorus Analysis
    if (data.phosphorus < 25) {
      result.phosphorus = {
        status: "critical",
        message: "फास्फोरस की कमी है। DAP उर्वरक डालें।",
      };
    } else if (data.phosphorus > 70) {
      result.phosphorus = { status: "warning", message: "फास्फोरस अधिक है।" };
    } else {
      result.phosphorus = {
        status: "good",
        message: "फास्फोरस का स्तर उचित है।",
      };
    }

    // Potassium Analysis
    if (data.potassium < 30) {
      result.potassium = {
        status: "critical",
        message: "पोटेशियम की कमी है। MOP उर्वरक डालें।",
      };
    } else if (data.potassium > 75) {
      result.potassium = { status: "warning", message: "पोटेशियम अधिक है।" };
    } else {
      result.potassium = {
        status: "good",
        message: "पोटेशियम का स्तर उचित है।",
      };
    }

    // Crop Recommendations
    if (
      data.ph >= 6.0 &&
      data.ph <= 7.5 &&
      data.moisture >= 40 &&
      data.nitrogen >= 40
    ) {
      result.recommendedCrops = ["धान", "गेहूं", "मक्का"];
    } else if (data.ph >= 6.5 && data.ph <= 8.0) {
      result.recommendedCrops = ["दलहन", "तिलहन", "सब्जी"];
    } else {
      result.recommendedCrops = ["मिश्रित फसल", "चारा फसल"];
    }

    // General Recommendations
    result.recommendations = [
      "नियमित मिट्टी परीक्षण कराएं",
      "जैविक खाद का प्रयोग बढ़ाएं",
      "फसल चक्र अपनाएं",
      "मिट्टी में कार्बनिक पदार्थ बढ़ाएं",
    ];

    return result;
  };

  const handleAnalyze = () => {
    setShowResults(true);
  };

  const analysisResult = analyzeSoil(soilData);

  const getStatusIcon = (status: "good" | "warning" | "critical") => {
    switch (status) {
      case "good":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case "critical":
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusColor = (status: "good" | "warning" | "critical") => {
    switch (status) {
      case "good":
        return "text-green-700 bg-green-50 border-green-200";
      case "warning":
        return "text-yellow-700 bg-yellow-50 border-yellow-200";
      case "critical":
        return "text-red-700 bg-red-50 border-red-200";
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title="Smart Soil Analysis"
        subtitle="Get Detailed Insights About Your Soil Health"
        description="Use our AI-powered soil analysis tool to understand your soil's condition and get personalized recommendations for better crop yields."
        primaryAction={{
          text: "Start Analysis",
          onClick: () =>
            document
              .getElementById("analysis-tool")
              ?.scrollIntoView({ behavior: "smooth" }),
        }}
        secondaryAction={{
          text: "View Success Stories",
          onClick: () => navigate("/success-stories"),
        }}
      />

      {/* Benefits Section */}
      <section className="py-16 bg-white border-b">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Why Soil Analysis Matters
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Understanding your soil is the foundation of successful farming.
              Our analysis helps you make informed decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <TrendingUp className="w-8 h-8 text-agri-primary mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Increase Yields
              </h3>
              <p className="text-sm text-gray-600">
                Optimize nutrient levels for maximum crop productivity
              </p>
            </div>
            <div>
              <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Water Efficiency
              </h3>
              <p className="text-sm text-gray-600">
                Understand moisture needs and irrigation requirements
              </p>
            </div>
            <div>
              <Leaf className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Crop Selection
              </h3>
              <p className="text-sm text-gray-600">
                Choose the right crops for your soil conditions
              </p>
            </div>
            <div>
              <Zap className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">
                Cost Reduction
              </h3>
              <p className="text-sm text-gray-600">
                Avoid unnecessary fertilizer and input costs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Tool */}
      <section id="analysis-tool" className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Soil Analysis Tool
              </h2>
              <p className="text-lg text-gray-600">
                Enter your soil parameters below to get instant analysis and
                recommendations.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Panel */}
              <Card className="card-agri">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Beaker className="w-5 h-5 text-agri-primary" />
                    <span>Soil Parameters</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* pH Level */}
                  <div>
                    <Label className="flex items-center space-x-2 mb-3">
                      <span>pH Level</span>
                      <span className="text-sm text-gray-500">
                        ({soilData.ph})
                      </span>
                    </Label>
                    <Slider
                      value={[soilData.ph]}
                      onValueChange={(value) =>
                        setSoilData({ ...soilData, ph: value[0] })
                      }
                      max={14}
                      min={0}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Acidic (0-6)</span>
                      <span>Neutral (7)</span>
                      <span>Alkaline (8-14)</span>
                    </div>
                  </div>

                  {/* Moisture */}
                  <div>
                    <Label className="flex items-center space-x-2 mb-3">
                      <Droplets className="w-4 h-4 text-blue-600" />
                      <span>Moisture (%)</span>
                      <span className="text-sm text-gray-500">
                        ({soilData.moisture}%)
                      </span>
                    </Label>
                    <Slider
                      value={[soilData.moisture]}
                      onValueChange={(value) =>
                        setSoilData({ ...soilData, moisture: value[0] })
                      }
                      max={100}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Nitrogen */}
                  <div>
                    <Label className="flex items-center space-x-2 mb-3">
                      <span>Nitrogen (N)</span>
                      <span className="text-sm text-gray-500">
                        ({soilData.nitrogen}%)
                      </span>
                    </Label>
                    <Slider
                      value={[soilData.nitrogen]}
                      onValueChange={(value) =>
                        setSoilData({ ...soilData, nitrogen: value[0] })
                      }
                      max={100}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Phosphorus */}
                  <div>
                    <Label className="flex items-center space-x-2 mb-3">
                      <span>Phosphorus (P)</span>
                      <span className="text-sm text-gray-500">
                        ({soilData.phosphorus}%)
                      </span>
                    </Label>
                    <Slider
                      value={[soilData.phosphorus]}
                      onValueChange={(value) =>
                        setSoilData({ ...soilData, phosphorus: value[0] })
                      }
                      max={100}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Potassium */}
                  <div>
                    <Label className="flex items-center space-x-2 mb-3">
                      <span>Potassium (K)</span>
                      <span className="text-sm text-gray-500">
                        ({soilData.potassium}%)
                      </span>
                    </Label>
                    <Slider
                      value={[soilData.potassium]}
                      onValueChange={(value) =>
                        setSoilData({ ...soilData, potassium: value[0] })
                      }
                      max={100}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Temperature */}
                  <div>
                    <Label className="flex items-center space-x-2 mb-3">
                      <Thermometer className="w-4 h-4 text-orange-600" />
                      <span>Temperature (°C)</span>
                      <span className="text-sm text-gray-500">
                        ({soilData.temperature}°C)
                      </span>
                    </Label>
                    <Slider
                      value={[soilData.temperature]}
                      onValueChange={(value) =>
                        setSoilData({ ...soilData, temperature: value[0] })
                      }
                      max={50}
                      min={0}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <Button
                    onClick={handleAnalyze}
                    className="btn-agri-primary w-full"
                  >
                    Analyze Soil
                  </Button>
                </CardContent>
              </Card>

              {/* Results Panel */}
              <Card className="card-agri">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-agri-primary" />
                    <span>Analysis Results</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!showResults ? (
                    <div className="text-center py-12">
                      <Beaker className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">
                        Enter soil parameters and click "Analyze Soil" to see
                        results.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Parameter Status */}
                      {Object.entries(analysisResult).map(([key, value]) => {
                        if (
                          key === "recommendedCrops" ||
                          key === "recommendations"
                        )
                          return null;
                        const status = value as {
                          status: "good" | "warning" | "critical";
                          message: string;
                        };
                        return (
                          <div
                            key={key}
                            className={`p-3 rounded-lg border ${getStatusColor(status.status)}`}
                          >
                            <div className="flex items-center space-x-2 mb-1">
                              {getStatusIcon(status.status)}
                              <span className="font-medium capitalize">
                                {key === "ph" ? "pH" : key}
                              </span>
                            </div>
                            <p className="text-sm">{status.message}</p>
                          </div>
                        );
                      })}

                      {/* Recommended Crops */}
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-6">
                        <h4 className="font-semibold text-green-800 mb-2 flex items-center space-x-2">
                          <Leaf className="w-4 h-4" />
                          <span>सुझाई गई फसलें</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.recommendedCrops.map(
                            (crop, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                              >
                                {crop}
                              </span>
                            ),
                          )}
                        </div>
                      </div>

                      {/* Recommendations */}
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-2">
                          सिफारिशें
                        </h4>
                        <ul className="space-y-1">
                          {analysisResult.recommendations.map((rec, index) => (
                            <li
                              key={index}
                              className="text-sm text-blue-700 flex items-start space-x-2"
                            >
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2"></div>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How Our Soil Analysis Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our AI-powered analysis considers multiple factors to provide
              accurate recommendations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Data Collection
              </h3>
              <p className="text-gray-600">
                Input your soil parameters using our easy-to-use interface or
                connect IoT sensors for automatic data collection.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                AI Analysis
              </h3>
              <p className="text-gray-600">
                Our machine learning algorithms analyze your data against
                optimal ranges and local crop requirements.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Recommendations
              </h3>
              <p className="text-gray-600">
                Receive personalized recommendations for crops, fertilizers, and
                soil management practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 agri-gradient-bg text-white">
        <div className="container-max section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Professional Soil Testing?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            For more detailed laboratory analysis and field assessments, contact
            our agricultural experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/contact")}
              size="lg"
              variant="secondary"
              className="bg-white text-agri-primary hover:bg-gray-100"
            >
              Contact Our Experts <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              onClick={() => navigate("/chatbot")}
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-agri-primary"
            >
              Ask Our AI Assistant <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SoilAnalysis;
