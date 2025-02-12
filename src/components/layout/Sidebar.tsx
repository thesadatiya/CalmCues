import { Button } from "@/components/ui/button";
import { PenSquare, Users, MessageSquare } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    icon: <PenSquare className="w-4 h-4" />,
    label: "Create Post",
    path: "/dashboard",
  },
  {
    icon: <Users className="w-4 h-4" />,
    label: "Community",
    path: "/dashboard/community",
  },
  {
    icon: <MessageSquare className="w-4 h-4" />,
    label: "Messages",
    path: "/dashboard/messages",
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 border-r h-[calc(100vh-4rem)] fixed top-16 left-0 bg-background p-4">
      <div className="space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.path}
            variant={location.pathname === item.path ? "secondary" : "ghost"}
            className="w-full justify-start gap-2"
            asChild
          >
            <Link to={item.path}>
              {item.icon}
              {item.label}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
