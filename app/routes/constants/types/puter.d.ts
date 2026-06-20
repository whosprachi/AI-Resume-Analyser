interface FSItem {
  id: string;
  uid: string;
  name: string;
  path: string;
  is_dir: boolean;
  parent_id: string;
  parent_uid: string;
  created: number;
  modified: number;
  accessed: number;
  size: number | null;
  writable: boolean;
}

interface PuterUser {
  uuid: string;
  username: string;
}

interface KVItem {
  key: string;
  value: string;
}

interface ChatMessageContent {
  type: "file" | "text";
  puter_path?: string;
  text?: string;
}

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string | ChatMessageContent[];
}

interface PuterChatOptions {
  model?: string;
  stream?: boolean;
  max_tokens?: number;
  temperature?: number;
  tools?: {
    type: "function";
    function: {
      name: string;
      description: string;
      parameters: {
        type: string;
        properties: Record<string, unknown>;
      };
    }[];
  };
}

interface AIResponse {
  index: number;
  message: {
    role: string;
    content: string | unknown[];
    refusal: string | null;
    annotations: unknown[];
  };
  logprobs: unknown | null;
  finish_reason: string;
  usage: {
    type: string;
    model: string;
    amount: number;
    cost: number;
  }[];
  via_ai_chat_service: boolean;
}

interface Puter {
  ai: {
    chat: (
      messages: string | ChatMessage[],
      options?: PuterChatOptions
    ) => Promise<AIResponse>;
  };

  auth: {
    signIn(): Promise<PuterUser>;
    signOut(): Promise<void>;
    getUser(): Promise<PuterUser | null>;
  };

  fs: {
    read(path: string): Promise<string>;
    write(path: string, content: string): Promise<void>;
    readdir(path: string): Promise<FSItem[]>;
  };

  kv: {
    get(key: string): Promise<KVItem | null>;
    set(key: string, value: string): Promise<void>;
  };
}

declare global {
  interface Window {
    puter?: Puter;
  }
}

export {};