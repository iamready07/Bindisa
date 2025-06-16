import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/about", label: t("nav.about") },
    { path: "/team", label: t("nav.team") },
    { path: "/technology", label: t("nav.technology") },
    { path: "/success-stories", label: t("nav.success") },
    { path: "/contact", label: t("nav.contact") },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-max section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <img
                src="/bindisa-agritech-logo.png"
                alt="Bindisa Agritech"
                className="h-12 w-auto object-contain filter brightness-0 invert"
                onError={(e) => {
                  // Fallback to text logo if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const fallback = document.createElement("div");
                  fallback.className = "flex items-center space-x-3";
                  fallback.innerHTML = `
                    <div class="w-12 h-12 bg-agri-primary rounded-lg flex items-center justify-center">
                      <span class="text-white font-bold text-xl">B</span>
                    </div>
                    <div class="flex flex-col">
                      <span class="text-2xl font-bold text-white">Bindisa Agritech</span>
                      <span class="text-sm text-gray-300">Pvt. Ltd.</span>
                    </div>
                  `;
                  target.parentElement?.appendChild(fallback);
                }}
              />
            </div>
            <p className="text-gray-300 mb-6 max-w-md">{t("footer.tagline")}</p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-agri-primary transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.quick-links")}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-agri-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.contact-info")}
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-agri-primary" />
                <div>
                  <p className="text-gray-300">+91 9631157174</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-agri-primary" />
                <div>
                  <p className="text-gray-300">info@bindisaagritech.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-agri-primary mt-1" />
                <div>
                  <p className="text-gray-300">{t("contact.gaya-address")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              {t("footer.rights")}
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">
                CIN: U46539BR2025PTC073688
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
