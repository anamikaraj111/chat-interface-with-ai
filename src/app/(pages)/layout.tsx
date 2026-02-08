import AiSideBar from "@/components/AiSidebar/AISidebar"
import ChatList from "@/components/ChatList/ChatList";
import { Card } from "@/components/ui/card";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#e0d9ff] flex items-center justify-center p-4">
      <Card
        style={{ padding: 0 }}
        className="w-full max-w-7xl overflow-hidden bg-white shadow-lg rounded-xl"
      >
        <div className="flex h-[650px]">
          <ChatList />
          <div className="flex-1 flex flex-col h-full">{children}</div>
          <AiSideBar />
        </div>
      </Card>
    </div>
  );
}
