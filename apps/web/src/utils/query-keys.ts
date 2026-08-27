export const QUERY_KEYS = {
  forms: {
    all: ["forms"] as const,
    detail: (id: string) => ["forms", id] as const,
  },
};
