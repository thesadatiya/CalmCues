import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  onJoinClick?: () => void;
}

const HeroSection = ({
  title = "Your Safe Space for Support",
  subtitle = "Join our anonymous community where you can share, connect, and find the support you need",
  onJoinClick = () => console.log("Join clicked"),
}: HeroSectionProps) => {
  const avatars = [
    "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=3",
    "https://api.dicebear.com/7.x/avataaars/svg?seed=4",
  ];

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 mb-8 max-w-2xl"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            size="lg"
            onClick={onJoinClick}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-full"
          >
            Join Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>

        {/* Floating Avatars */}
        <div className="absolute inset-0 pointer-events-none">
          {avatars.map((avatar, index) => (
            <motion.img
              key={index}
              src={avatar}
              alt="Community member avatar"
              className="absolute w-16 h-16 rounded-full shadow-lg"
              initial={{
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                opacity: 0,
              }}
              animate={{
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200,
                opacity: 0.7,
                transition: {
                  repeat: Infinity,
                  duration: 20 + Math.random() * 10,
                  repeatType: "reverse",
                },
              }}
              style={{
                left: `${20 + index * 20}%`,
                top: `${30 + (index % 3) * 20}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Background gradient circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-purple-200 opacity-20"
          animate={{
            x: [-50, 50],
            y: [-20, 20],
            scale: [1, 1.1, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
          style={{ left: "10%", top: "20%" }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-blue-200 opacity-20"
          animate={{
            x: [50, -50],
            y: [20, -20],
            scale: [1, 1.2, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
          }}
          style={{ right: "10%", bottom: "20%" }}
        />
      </div>
    </div>
  );
};

export default HeroSection;
