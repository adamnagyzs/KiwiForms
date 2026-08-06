export const unauthenticatedRoutePaths = Object.freeze({
  root: "/",
  signIn: "/auth/sign-in",
  signUp: "/auth/sign-up",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  home: "/home",
  form: "/forms/guest/:id",
});

export const authenticatedRoutePaths = Object.freeze({
  root: "/",
  createForm: "/createform",
  form: "/forms/:id",
  editForm: "/forms/:id/edit",
});
