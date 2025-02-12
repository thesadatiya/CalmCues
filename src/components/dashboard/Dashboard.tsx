import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { MessageCircle, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/lib/auth";
import DashboardNavbar from "../layout/DashboardNavbar";
import Sidebar from "../layout/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Post {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  user: {
    username: string;
  };
  replies: Array<{
    id: string;
    content: string;
    created_at: string;
    user: {
      username: string;
    };
  }>;
}

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [replyContent, setReplyContent] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();
      if (!user) navigate("/");
    };
    checkAuth();
    fetchPosts();

    const postsSubscription = supabase
      .channel("posts_channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "posts",
        },
        () => {
          fetchPosts();
        },
      )
      .subscribe();

    return () => {
      postsSubscription.unsubscribe();
    };
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        *,
        user:users!posts_user_id_fkey(username),
        replies(*, user:users!replies_user_id_fkey(username))
      `,
      )
      .order("created_at", { ascending: false });

    if (error) console.error("Error fetching posts:", error);
    else setPosts(data || []);
  };

  const createPost = async () => {
    if (!newPost.trim()) return;

    const user = await getCurrentUser();
    if (!user) return;

    const { error } = await supabase
      .from("posts")
      .insert([{ content: newPost, user_id: user.id }]);

    if (error) console.error("Error creating post:", error);
    else {
      setNewPost("");
      fetchPosts();
    }
  };

  const createReply = async (postId: string) => {
    const content = replyContent[postId];
    if (!content?.trim()) return;

    const user = await getCurrentUser();
    if (!user) return;

    const { error } = await supabase
      .from("replies")
      .insert([{ content, post_id: postId, user_id: user.id }]);

    if (error) console.error("Error creating reply:", error);
    else {
      setReplyContent((prev) => ({ ...prev, [postId]: "" }));
      fetchPosts();
    }
  };

  const startChat = async (userId: string) => {
    navigate(`/chat/${userId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />
      <Sidebar />

      <main className="pl-64 pt-16">
        <div className="max-w-3xl mx-auto p-8">
          <Card className="p-6 mb-8 bg-white">
            <Textarea
              placeholder="Share your thoughts..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="mb-4 min-h-[100px]"
            />
            <Button onClick={createPost} className="w-full">
              <Send className="w-4 h-4 mr-2" /> Share Post
            </Button>
          </Card>

          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="p-6 bg-white">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar>
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.user?.username}`}
                    />
                    <AvatarFallback>
                      {post.user?.username?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{post.user?.username}</p>
                    <p className="text-muted-foreground text-sm">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                    <p className="mt-2 text-lg">{post.content}</p>
                  </div>
                </div>

                <div className="space-y-4 ml-12">
                  {post.replies?.map((reply) => (
                    <div
                      key={reply.id}
                      className="flex items-start gap-4 pt-4 border-t"
                    >
                      <Avatar>
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${reply.user?.username}`}
                        />
                        <AvatarFallback>
                          {reply.user?.username?.[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{reply.user?.username}</p>
                        <p className="text-muted-foreground text-sm">
                          {new Date(reply.created_at).toLocaleDateString()}
                        </p>
                        <p className="mt-2">{reply.content}</p>
                      </div>
                      {post.user_id === (getCurrentUser() as any)?.id && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => startChat(reply.user?.username)}
                        >
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-4 ml-12">
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Write a reply..."
                      value={replyContent[post.id] || ""}
                      onChange={(e) =>
                        setReplyContent((prev) => ({
                          ...prev,
                          [post.id]: e.target.value,
                        }))
                      }
                      className="flex-1"
                    />
                    <Button onClick={() => createReply(post.id)}>
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
