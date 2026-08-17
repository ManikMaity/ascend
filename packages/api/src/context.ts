export type Context = {
  requestId: string;
};

export type CreateContextOptions = {
  requestId?: string;
};

export function createContext(options: CreateContextOptions = {}): Context {
  return {
    requestId: options.requestId ?? crypto.randomUUID(),
  };
}
