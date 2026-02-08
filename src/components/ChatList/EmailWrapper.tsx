"use client";

import useChatStore from "@/store/ChatStore";
import { EmailItem } from "./EmailItem";



const EmailWrapper = () => {
  const { chats } = useChatStore();
  return (
    <>
      {chats.map((item, index) => (
        <EmailItem
          id={item.id}
          key={index}
          avatar={item.avatar}
          avatarColor={item.avatarColor}
          name={item.name}
          company={item.company}
          preview={item.conversations.at(-1)?.message ?? ""}
          time={item.lastTalked}
          badge={item.badge}
          badgeColor={item.badgeColor}
        />
      ))}
    </>
  );
};

export default EmailWrapper;
