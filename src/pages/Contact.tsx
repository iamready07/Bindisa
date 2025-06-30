import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  Users,
  MessageSquare,
} from "lucide-react";
import Hero from "../components/Hero";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useLanguage } from "../contexts/LanguageContext";

const Contact: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      value: "+91 9631157174",
      description: "Mon-Sat from 8am to 5pm",
      action: () => window.open("tel:+919631157174"),
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@bindisaagritech.com",
      description: "We reply within 24 hours",
      action: () => window.open("mailto:info@bindisaagritech.com"),
    },
    {
      icon: MapPin,
      title: "Office",
      value: "Gaya, Bihar, India",
      description: "823001",
      action: () => window.open("https://maps.google.com/?q=Gaya,Bihar,India"),
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero
        title={t("contact.title")}
        subtitle={t("contact.subtitle")}
        description="Have questions about our agricultural solutions? Need technical support? Want to collaborate? We're here to help farmers and agricultural businesses succeed."
        primaryAction={{
          text: "Call Us Now",
          onClick: () => window.open("tel:+919631157174"),
        }}
        secondaryAction={{
          text: "Send Email",
          onClick: () => window.open("mailto:info@bindisaagritech.com"),
        }}
      />

      {/* Contact Methods */}
      <section className="py-16 bg-white border-b">
        <div className="container-max section-padding">
          <div className="grid md:grid-cols-3 gap-6">
            {contactInfo.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <Card
                  key={index}
                  className="card-agri text-center cursor-pointer"
                  onClick={contact.action}
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-agri-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-agri-primary" />
                    </div>
                    <CardTitle className="text-lg">{contact.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-gray-900 mb-2">
                      {contact.value}
                    </p>
                    <p className="text-sm text-gray-600">
                      {contact.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-20 bg-gray-50">
        <div className="container-max section-padding">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as
                possible. Our agricultural experts are here to help.
              </p>

              {submitted ? (
                <Card className="card-agri bg-green-50 border-green-200">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-green-700">
                      Thank you for contacting us. We'll respond to your inquiry
                      within 24 hours.
                    </p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      variant="outline"
                      className="mt-4 border-green-300 text-green-700 hover:bg-green-100"
                    >
                      Send Another Message
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="card-agri">
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">{t("contact.name")} *</Label>
                          <Input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            required
                            placeholder="Your full name"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">{t("contact.phone")} *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                phone: e.target.value,
                              })
                            }
                            required
                            placeholder="Your phone number"
                            className="mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          required
                          placeholder="your.email@example.com"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          type="text"
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              subject: e.target.value,
                            })
                          }
                          required
                          placeholder="What is this about?"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="message">
                          {t("contact.message")} *
                        </Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          required
                          placeholder="Tell us more about your inquiry..."
                          rows={5}
                          className="mt-1"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-agri-primary"
                      >
                        {isSubmitting ? "Sending..." : t("contact.send")}
                        {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Map and Office Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t("contact.address-title")}
              </h2>

              {/* Office Details */}
              <Card className="card-agri mb-6">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-agri-primary mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Headquarters
                        </h3>
                        <p className="text-gray-600">
                          {t("contact.gaya-address")}
                        </p>
                        <p className="text-sm text-gray-500">
                          CIN: U46539BR2025PTC073688
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-agri-primary mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Business Hours
                        </h3>
                        <p className="text-gray-600">
                          Monday - Saturday: 8:00 AM - 6:00 PM
                        </p>
                        <p className="text-gray-600">
                          Sunday: 10:00 AM - 4:00 PM
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Users className="w-5 h-5 text-agri-primary mt-1" />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Support Languages
                        </h3>
                        <p className="text-gray-600">Hindi, Marathi, English</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map */}
              <Card className="card-agri">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d230247.02935073863!2d84.94721645429687!3d24.750224699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f32a93fae0963d%3A0x9333298d80dbc58b!2sGaya%2C%20Bihar!5e0!3m2!1sen!2sin!4v1647254839685!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Bindisa Agritech Office Location"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Quick answers to common questions about our services and
              technology.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="card-agri">
              <CardHeader>
                <CardTitle className="text-lg">
                  How do I get started with Bindisa Agritech?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Simply contact us through the form above or call +91
                  9631157174. Our team will assess your needs and recommend the
                  best solutions for your farm.
                </p>
              </CardContent>
            </Card>

            <Card className="card-agri">
              <CardHeader>
                <CardTitle className="text-lg">
                  What crops do you support?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We support major crops including rice, wheat, maize,
                  vegetables, fruits, and pulses. Our AI adapts to different
                  crop types and local conditions.
                </p>
              </CardContent>
            </Card>

            <Card className="card-agri">
              <CardHeader>
                <CardTitle className="text-lg">
                  Do you provide on-site support?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Yes, we offer on-site visits for soil testing, equipment
                  installation, and farmer training. Contact us to schedule a
                  visit to your farm.
                </p>
              </CardContent>
            </Card>

            <Card className="card-agri">
              <CardHeader>
                <CardTitle className="text-lg">
                  Is your technology suitable for small farmers?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Absolutely! Our solutions are designed to be accessible and
                  affordable for farmers of all scales, from small holdings to
                  large farms.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 agri-gradient-bg text-white">
        <div className="container-max section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join the agricultural revolution. Contact us today to learn how
            Bindisa Agritech can help improve your farm's productivity and
            sustainability.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/chatbot")}
              size="lg"
              variant="secondary"
              className="bg-white text-agri-primary hover:bg-gray-100"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat with AI Assistant
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

export default Contact;
