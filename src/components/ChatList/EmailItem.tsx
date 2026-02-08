"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import useChatStore from "@/store/ChatStore";
import moment from "moment";
import "@/lib/momentConfig";
interface EmailItemProps {
  id: number;
  avatar: string;
  avatarColor?: string;
  name: string;
  company?: string;
  preview: string;
  subtext?: string;
  time: string | Date;
  badge?: string;
  badgeColor?: string;
  isActive?: boolean;
}

export function EmailItem({
  id,
  avatar,
  avatarColor = "bg-gray-100",
  name,
  company,
  preview,
  subtext,
  time,
  badge,
  badgeColor = "bg-gray-100",
}: EmailItemProps) {
  const { currentChatId, setCurrentChatId } = useChatStore();
  return (
    <div
      onClick={() => {
        setCurrentChatId(id);
      }}
      className={cn(
        "flex items-center gap-3 p-3 border-l-2 font-[family-name:var(--font-geist-sans)] border-transparent cursor-pointer",
        currentChatId === id ? "bg-blue-100" : "hover:bg-gray-100"
      )}
    >
      <Avatar className="h-8 w-8 text-xs">
        <AvatarFallback className={avatarColor}>{avatar}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-end">
          <div className="flex-1">
            <p className="text-sm font-medium truncate">
              {name}{" "}
              {company && <span className="text-gray-500">· {company}</span>}
            </p>
            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
              {preview}
            </p>
            {subtext && (
              <p className="text-xs text-gray-500 truncate mt-0.5">{subtext}</p>
            )}
          </div>
          <div className="flex flex-col gap-1 items-end ml-2">
            {badge && (
              <span
                className={cn("text-xs px-1.5 py-0.2 rounded-full", badgeColor)}
              >
                {badge}
              </span>
            )}
            <span className="text-xs text-gray-500">
              {typeof time == "string" ? time : moment(time).fromNow()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
