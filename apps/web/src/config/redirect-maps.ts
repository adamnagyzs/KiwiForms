type RedirectMap = Record<
  string,
  (params: Record<string, string | undefined>) => string
>;

export const unauthenticatedRedirectMap: RedirectMap = {
  "/forms/:id": (params) => `/forms/guest/${params.id}`,
};

export const authenticatedRedirectMap: RedirectMap = {
  "/forms/guest/:id": (params) => `/forms/${params.id}`,
};
