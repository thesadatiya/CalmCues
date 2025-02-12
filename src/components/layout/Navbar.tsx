import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Info, LogIn, UserPlus } from "lucide-react";

interface NavbarProps {
  onLoginClick?: () => void;
  onSignUpClick?: () => void;
}

const Navbar = ({
  onLoginClick = () => {},
  onSignUpClick = () => {},
}: NavbarProps) => {
  return (
    <nav className="w-full h-[72px] bg-background border-b border-border px-4 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-xl font-semibold text-primary flex items-center gap-2"
          >
            <Home className="w-5 h-5" />
            Calm Cues
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={onLoginClick}
            className="flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            Login
          </Button>

          <Button onClick={onSignUpClick} className="flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
