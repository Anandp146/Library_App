// src/features/navigation/Footer/Footer.tsx

import React from "react";
import { FaGithub, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "../../../assets/logo.jpg";

const socialLinks = [
  { label: "YouTube", icon: FaYoutube },
  { label: "Instagram", icon: FaInstagram },
  { label: "Twitter", icon: FaTwitter },
  { label: "GitHub", icon: FaGithub },
];

const links = [
  [
    { label: "About Us", key: "item-1-1" },
    { label: "Blog", key: "item-1-2" },
    { label: "Contact Us", key: "item-1-4" },
  ],
  [
    { label: "Support", key: "header-2" },
    { label: "Help Center", key: "item-2-1" },
    { label: "Terms of Service", key: "item-2-2" },
    { label: "Privacy Policy", key: "item-2-3" },
  ],
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-linear-gradient  font-serif py-8 md:py-6">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <div className="flex items-center mb-3">
              <img src={logo} alt="Company logo" className="w-16 h-auto" />
              <span className="text-2xl font-bold text-gray-300 pl-2">
                Library
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {links.map((col, colIndex) => (
              <ul key={colIndex} className="space-y-2">
                {col.map((link) => (
                  <li
                    key={link.key}
                    className="text-gray-300 hover:text-white text-sm"
                  >
                    {link.label}
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <div className="flex flex-col ">
            <div className="flex space-x-5 my-3 ">
              {socialLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <a key={index} className="text-white hover:text-pink-400">
                    <Icon size={24} />
                  </a>
                );
              })}
            </div>
            <p className=" text-gray-300 text-sm">
              © {new Date().getFullYear()} Your Company. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
