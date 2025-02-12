import React from "react";
import { Shield, Lock, Heart } from "lucide-react";
import { Separator } from "../ui/separator";

interface FooterProps {
  trustIndicators?: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;
  privacyStatement?: string;
}

const Footer = ({
  trustIndicators = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Anonymous",
      description: "Your privacy is our top priority",
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "End-to-End Encryption",
      description: "All conversations are fully encrypted",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Community Trust",
      description: "Built with care for our community",
    },
  ],
  privacyStatement = "We are committed to maintaining your privacy and providing a safe space for support. Your trust is important to us.",
}: FooterProps) => {
  return (
    <footer className="w-full bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {trustIndicators.map((indicator, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 text-primary">{indicator.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{indicator.title}</h3>
              <p className="text-muted-foreground">{indicator.description}</p>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="text-center">
          <p className="text-muted-foreground mb-6">{privacyStatement}</p>
          <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Contact Us
            </a>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            © {new Date().getFullYear()} Calm Cues. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
