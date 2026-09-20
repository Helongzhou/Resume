"use client";

import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useStreamTypewriter } from "@/components/agent/useStreamTypewriter";

type Props = {
  content: string;
  /** Still receiving tokens from the network */
  streaming?: boolean;
  onRevealIdle?: () => void;
};

export function AgentMarkdown({
  content,
  streaming = false,
  onRevealIdle,
}: Props) {
  const { shown, catchingUp } = useStreamTypewriter(content, true, 11);
  const busy = streaming || catchingUp;
  const text = busy ? shown : content;

  useEffect(() => {
    if (!busy) onRevealIdle?.();
  }, [busy, onRevealIdle]);

  if (!text && streaming) {
    return (
      <span className="inline-flex items-center text-muted">
        <span className="type-cursor" aria-hidden />
      </span>
    );
  }

  return (
    <div className="agent-md">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
      {busy ? <span className="type-cursor agent-md-cursor" aria-hidden /> : null}
    </div>
  );
}
