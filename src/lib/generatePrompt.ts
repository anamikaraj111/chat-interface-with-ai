import { Conversation } from "@/types";

function buildPrompt(entry: {
  name: string;
  context: string;
  conversations: Conversation[];
}) {
  const { name, context, conversations } = entry;

  const history = conversations
    .map((c) => `${c.sender}: ${c.message}`)
    .join("\n");

  return `
You are now ${name}. Your role is defined below.

Context:
${context}

Here is your past conversation with me:
${history || "No prior messages."}

Instructions:
- Speak as if you are ${name}.
- Use your personality and knowledge to respond naturally.
- Start the conversation based on the context if no message has been received yet.
- When I speak, respond directly and stay in character.
- Never break character or mention that you're an AI.
- Keep replies brief, relevant, and in the tone ${name} would naturally use.

Begin the conversation now.
`;
}

export { buildPrompt };
