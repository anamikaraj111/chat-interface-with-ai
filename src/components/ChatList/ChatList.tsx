import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

import EmailWrapper from "./EmailWrapper";
function ChatList() {
  return (
    <>
      <div className="w-[350px] border-r border-gray-200 flex flex-col">
        <div className="py-4 px-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-[family-name:var(--font-geist-sans)] font-bold">
              Your inbox
            </h2>
          </div>
        </div>

        <div className="">
          <div className="flex items-center justify-between px-4 pb-4 font-[family-name:var(--font-geist-sans)]">
            <div className="flex items-center justify-between mt-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1 font-semibold"
              >
                <span>5 Open</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2 font-semibold">
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <span>Waiting longest</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="overflow-auto flex-1">
            <EmailWrapper />
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatList;
