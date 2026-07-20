export const unauthenticatedRoutePaths = Object.freeze({
  root: "/",
  signIn: "/auth/sign-in",
  signUp: "/auth/sign-up",
  forgotPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
});

export const authenticatedRoutePaths = Object.freeze({
  root: "/",
  home: "/home",
  createForm: "/createform",
});
