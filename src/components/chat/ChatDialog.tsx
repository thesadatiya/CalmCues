import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";
import { getCurrentUser } from "@/lib/auth";

interface Message {
  id: string;
  content: string;
  created_at: string;
  sender_id: string;
}

interface ChatDialogProps {
  receiverId: string;
}

export function ChatDialog({ receiverId }: ChatDialogProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchMessages();

    const messagesSubscription = supabase
      .channel("messages_channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "private_messages",
        },
        () => {
          fetchMessages();
        },
      )
      .subscribe();

    return () => {
      messagesSubscription.unsubscribe();
    };
  }, [receiverId]);

  const fetchMessages = async () => {
    const user = await getCurrentUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("private_messages")
      .select("*")
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
      .order("created_at", { ascending: true });

    if (error) console.error("Error fetching messages:", error);
    else setMessages(data || []);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const user = await getCurrentUser();
    if (!user) return;

    const { error } = await supabase.from("private_messages").insert([
      {
        content: newMessage,
        sender_id: user.id,
        receiver_id: receiverId,
      },
    ]);

    if (error) console.error("Error sending message:", error);
    else {
      setNewMessage("");
      fetchMessages();
    }
  };

  return (
    <Card className="h-[500px] flex flex-col p-4">
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender_id === receiverId ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${message.sender_id === receiverId ? "bg-muted" : "bg-primary text-primary-foreground"}`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="flex gap-2 mt-4">
        <Input
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <Button onClick={sendMessage}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
}
