import { create } from "zustand";
import { Conversation } from "@/types";

const DemoChatWithContext = [
  {
    id: 1,
    name: "Luis Easton",
    company: "GitHub",
    avatar: "L",
    badge: "",
    badgeColor: "bg-red-300",
    avatarColor: "bg-blue-500 text-white",
    conversations: [
      // {
      //   sender: "Luis",
      //   message:
      //     "Hey, I noticed some inconsistencies in the new API documentation. Could we schedule a call to go over them?",
      // },
      // {
      //   sender: "Me",
      //   message:
      //     "Absolutely, Luis. Let's set up a meeting for tomorrow at 10 AM to discuss the details.",
      // },
    ],
    context:
      "Luis is a developer advocate at GitHub. He's working with me to improve the new API documentation. If I ask the AI anything about our API documentation process or decisions, it should reply with suggestions or updates I can easily forward to Luis as a message.",
    lastTalked: "45m",
  },
  {
    id: 2,
    name: "Ivan",
    company: "Nike",
    avatar: "I",
    avatarColor: "bg-rose-500 text-white",
    badge: "2 mins",
    badgeColor: "bg-amber-100 text-amber-600",
    conversations: [
      {
        sender: "Ivan",
        message:
          "The latest batch of product images isn't aligning with our brand guidelines. Can you review them?",
      },
      {
        sender: "Me",
        message:
          "Sure, Ivan. I'll go through the images and provide feedback by end of day.",
      },
    ],
    context:
      "Ivan is the brand manager at Nike. We're reviewing product visuals to ensure brand compliance. The AI should provide clear, brief messages I can send to Ivan when I ask for feedback or suggestions related to image reviews or branding.",
    lastTalked: "50m",
  },
  {
    id: 3,
    name: "Lead from New York",
    company: "TechNova",
    avatar: "L",
    avatarColor: "bg-cyan-800 text-white",
    badge: "",
    badgeColor: "bg-gray-300",
    conversations: [
      {
        sender: "Lead",
        message:
          "Our team is interested in your cloud solutions. Could you provide a detailed proposal?",
      },
      {
        sender: "Me",
        message:
          "Certainly. I'll prepare a comprehensive proposal and send it over by Thursday.",
      },
    ],
    context:
      "This is a lead from TechNova based in New York, interested in our cloud services. I want the AI to help draft, refine, or summarize parts of the proposal in a way that's ready to send to this client.",
    lastTalked: "45m",
  },
  {
    id: 4,
    name: "Booking API Issues",
    company: "Small Crafts",
    avatar: "B",
    avatarColor: "bg-gray-800 text-white",
    badge: "",
    badgeColor: "bg-rose-100",
    conversations: [
      {
        sender: "Luis",
        message:
          "We're experiencing timeouts with the booking API during peak hours. Any insights?",
      },
      {
        sender: "Me",
        message:
          "I'll analyze the server logs and get back to you with a solution shortly.",
      },
    ],
    context:
      "Luis from Small Crafts is facing booking API timeout issues during high traffic. The AI should suggest specific troubleshooting steps or insights that I can directly communicate to him to help solve the problem quickly.",
    lastTalked: "46m",
  },
  {
    id: 5,
    name: "Miracle",
    avatar: "M",
    avatarColor: "bg-orange-500 text-white",
    badge: "",
    badgeColor: "bg-cyan-100",
    company: "Exemplary Bank",
    conversations: [
      {
        sender: "Miracle",
        message:
          "The new authentication module isn't integrating smoothly with our existing systems.",
      },
      {
        sender: "Me",
        message:
          "Let's set up a troubleshooting session to identify and resolve the integration issues.",
      },
    ],
    context:
      "Miracle from Exemplary Bank is facing integration issues with our new authentication module. When I ask the AI, it should provide short, technical suggestions or fixes that I can pass directly to Miracle.",
    lastTalked: "46m",
  },
];

interface Chat {
  id: number;
  name: string;
  company: string;
  avatar: string;
  badge: string;
  badgeColor: string;
  avatarColor: string;
  conversations: Conversation[];
  context: string;
  lastTalked: Date | string;
}

interface ChatState {
  chats: Chat[];
  currentChatId: number;
  setCurrentChatId: (id: number) => void;
  getCurrentChat: () => Chat | undefined;
  addMessageToCurrentChat: (sender: string, message: string) => void;
  addBadgeToCurrentChat: (badge: string) => void;
}

const useChatStore = create<ChatState>((set, get) => ({
  chats: DemoChatWithContext,
  currentChatId: 1,

  setCurrentChatId: (id) => set({ currentChatId: id }),

  getCurrentChat: () => {
    const { chats, currentChatId } = get();
    return chats.find((chat) => chat.id === currentChatId);
  },

  addMessageToCurrentChat: (sender, message) => {
    set((state) => {
      const updatedChats = state.chats.map((chat) => {
        if (chat.id !== state.currentChatId) return chat;
        return {
          ...chat,
          conversations: [...chat.conversations, { sender, message }],
          lastTalked: new Date(),
        };
      });
      return { chats: updatedChats };
    });
  },
  addBadgeToCurrentChat: (badge) =>
    set((state) => {
      const updatedChats = state.chats.map((chat) => {
        if (chat.id !== state.currentChatId) return chat;
        return {
          ...chat,
          badge,
          lastTalked: new Date(),
        };
      });
      return { chats: updatedChats };
    }),
}));

export default useChatStore;
