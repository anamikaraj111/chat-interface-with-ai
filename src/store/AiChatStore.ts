import { create } from "zustand";

interface ConvType {
  sender: "user" | "model";
  message: string;
}

interface AiChatState {
  conv: ConvType[];
  addConversation: (sender: "user" | "model", message: string) => void;
  clearConversations: () => void;
}

const useAiChatStore = create<AiChatState>((set) => ({
  conv: [],
  addConversation: (sender, message) => {
    set((state) => ({
      conv: [...state.conv, { sender, message }],
    }));
  },
  clearConversations: () => set({ conv: [] }),
}));

export default useAiChatStore;
