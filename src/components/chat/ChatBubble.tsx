type ChatBubbleProps = {
  role: "employee" | "ai";
  text: string;
  isTyping?: boolean;
};

export function ChatBubble({ role, text, isTyping = false }: ChatBubbleProps) {
  const label = role === "ai" ? "AI" : "Сотрудник";

  return (
    <div className={`chat-bubble chat-bubble--${role}`}>
      <div className="chat-bubble__avatar" aria-hidden="true">
        {role === "ai" ? "AI" : "VK"}
      </div>
      <div className="chat-bubble__body">
        <div className="chat-bubble__meta">{label}</div>
        {isTyping ? (
          <div className="typing-indicator" aria-label="AI печатает">
            <span />
            <span />
            <span />
          </div>
        ) : (
          <p>{text}</p>
        )}
      </div>
    </div>
  );
}
