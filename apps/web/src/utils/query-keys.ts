export const QUERY_KEYS = Object.freeze({
  forms: {
    all: ["forms"],
    detail: (id: string) => ["forms", id],
  },
});
