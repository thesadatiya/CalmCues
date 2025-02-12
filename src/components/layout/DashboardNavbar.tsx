import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser } from "@/lib/auth";
import { useEffect, useState } from "react";

export default function DashboardNavbar() {
  const [username, setUsername] = useState("");
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`;

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      if (user?.user_metadata?.username) {
        setUsername(user.user_metadata.username);
      }
    };
    fetchUser();
  }, []);

  return (
    <nav className="w-full h-16 border-b bg-background px-4 flex items-center justify-between fixed top-0 z-50">
      <h1 className="text-xl font-semibold">Calm Cues</h1>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">{username}</span>
        <Avatar>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{username?.[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
