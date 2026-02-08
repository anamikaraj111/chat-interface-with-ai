import useSidebarStore from "@/store/SidebarStore";
import AiView from "./AiView";
import AiInput from "./AiInput";

export default function AICopilot() {
  const { isOpen } = useSidebarStore();

  return (
    <div className="relative flex flex-col h-full bg-white">
      {isOpen && (
        <>
          <div className="absolute bottom-[-100px] left-[-80px] w-[250px] h-[250px] bg-[#c7beee] rounded-full blur-3xl opacity-60 pointer-events-none z-0" />
          <div className="absolute bottom-[-100px] right-[-80px] w-[250px] h-[250px] bg-[#ffb68d] rounded-full blur-3xl opacity-60 pointer-events-none z-0" />
        </>
      )}

      <AiView />

      <AiInput />
    </div>
  );
}
