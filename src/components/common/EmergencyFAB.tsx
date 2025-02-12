import React, { useState } from "react";
import { MessageCircle, Phone, Heart, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";

interface EmergencyResource {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

interface EmergencyFABProps {
  resources?: EmergencyResource[];
  isOpen?: boolean;
}

const defaultResources: EmergencyResource[] = [
  {
    title: "Crisis Hotline",
    description: "24/7 confidential support",
    icon: <Phone className="h-5 w-5" />,
    action: () => window.open("tel:911", "_self"),
  },
  {
    title: "Emotional Support",
    description: "Connect with a counselor",
    icon: <Heart className="h-5 w-5" />,
    action: () => console.log("Support action"),
  },
  {
    title: "Emergency Services",
    description: "Get immediate help",
    icon: <AlertCircle className="h-5 w-5" />,
    action: () => console.log("Emergency action"),
  },
];

const EmergencyFAB: React.FC<EmergencyFABProps> = ({
  resources = defaultResources,
  isOpen: initialIsOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4"
          >
            <Card className="p-4 w-[320px] bg-white shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Emergency Support</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="space-y-3">
                {resources.map((resource, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start gap-3 hover:bg-slate-50"
                    onClick={resource.action}
                  >
                    {resource.icon}
                    <div className="text-left">
                      <div className="font-medium">{resource.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {resource.description}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="lg"
              className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90"
              onClick={() => setIsOpen(!isOpen)}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Emergency Support</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default EmergencyFAB;
