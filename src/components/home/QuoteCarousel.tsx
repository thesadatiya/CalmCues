import React, { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";

interface Quote {
  text: string;
  author: string;
}

interface QuoteCarouselProps {
  quotes?: Quote[];
  autoRotateInterval?: number;
}

const defaultQuotes: Quote[] = [
  {
    text: "You're not alone in this journey. Every step forward is progress.",
    author: "Anonymous",
  },
  {
    text: "Your feelings are valid, and it's okay to take time to process them.",
    author: "Anonymous",
  },
  {
    text: "Healing isn't linear, and that's perfectly normal.",
    author: "Anonymous",
  },
];

const QuoteCarousel = ({
  quotes = defaultQuotes,
  autoRotateInterval = 5000,
}: QuoteCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, autoRotateInterval);

    return () => clearInterval(timer);
  }, [quotes.length, autoRotateInterval]);

  return (
    <div className="w-full max-w-[1200px] h-[200px] mx-auto bg-background p-8 relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="h-full flex flex-col items-center justify-center p-8 bg-card/50 backdrop-blur-sm">
            <Quote className="w-8 h-8 mb-4 text-primary" />
            <p className="text-xl text-center text-foreground mb-4 font-light">
              {quotes[currentIndex].text}
            </p>
            <p className="text-sm text-muted-foreground italic">
              - {quotes[currentIndex].author}
            </p>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center mt-4 gap-2">
        {quotes.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-primary" : "bg-muted"}`}
            aria-label={`Go to quote ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default QuoteCarousel;
