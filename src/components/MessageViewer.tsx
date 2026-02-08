import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark-reasonable.min.css";

function MessageViewer({ message }: { message: string }) {
  return (
    <>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      >
        {message}
      </ReactMarkdown>
    </>
  );
}

export default MessageViewer;
