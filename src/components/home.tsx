import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./layout/Navbar";
import HeroSection from "./home/HeroSection";
import QuoteCarousel from "./home/QuoteCarousel";
import EmergencyFAB from "./common/EmergencyFAB";
import Footer from "./layout/Footer";
import { Dialog } from "@/components/ui/dialog";
import { AuthDialog } from "@/components/auth/AuthDialog";

interface HomeProps {
  isLoginDialogOpen?: boolean;
  isSignUpDialogOpen?: boolean;
}

const Home = ({
  isLoginDialogOpen = false,
  isSignUpDialogOpen = false,
}: HomeProps) => {
  const [showLoginDialog, setShowLoginDialog] = useState(isLoginDialogOpen);
  const [showSignUpDialog, setShowSignUpDialog] = useState(isSignUpDialogOpen);

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        onLoginClick={() => setShowLoginDialog(true)}
        onSignUpClick={() => setShowSignUpDialog(true)}
      />

      <main className="pt-[72px]">
        {" "}
        {/* Offset for fixed navbar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <HeroSection onJoinClick={() => setShowSignUpDialog(true)} />

          <section className="py-16 bg-slate-50">
            <QuoteCarousel />
          </section>
        </motion.div>
      </main>

      <Footer />
      <EmergencyFAB />

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <AuthDialog mode="login" onSuccess={() => setShowLoginDialog(false)} />
      </Dialog>

      {/* Sign Up Dialog */}
      <Dialog open={showSignUpDialog} onOpenChange={setShowSignUpDialog}>
        <AuthDialog
          mode="signup"
          onSuccess={() => setShowSignUpDialog(false)}
        />
      </Dialog>
    </div>
  );
};

export default Home;
