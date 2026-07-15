import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { unauthenticatedRoutePaths } from "@/config/router-paths";
import { useNavigate } from "react-router-dom";

import TextInput from "./TextInput";
import ErrorMessage from "./ErrorMessage";

const signupSchema = z
  .object({
    email: z.email("Invalid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>_\-\\[\]\/`~+=;'']/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string(),
    userName: z.string().min(3, "Username must be at least 3 characters long."),
    terms: z.boolean().refine((value) => value, {
      message: "You must accept the Terms and Conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type SignupForm = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({ resolver: zodResolver(signupSchema) });
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-400/80">
      <div className="w-full max-w-lg p-8 bg-teal-600 shadow-2xl rounded-xl">
        <h2 className="mb-8 text-2xl font-bold text-white">
          Create an account!
        </h2>

        <form className="space-y-4 px-2" onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Email"
            error={errors.email?.message}
            {...register("email")}
            type="email"
            placeholder="Email"
          />

          <TextInput
            label="Password"
            error={errors.password?.message}
            {...register("password")}
            type="password"
            placeholder="Password"
          />

          <TextInput
            label="Confirm Password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
            type="password"
            placeholder="Password"
          />

          <TextInput
            label="Displayed Username"
            error={errors.userName?.message}
            {...register("userName")}
            type="text"
            placeholder="Username"
          />

          <div className="flex gap-2 items-start">
            <input
              {...register("terms")}
              type="checkbox"
              className={`mt-1 size-4 rounded cursor-pointer
      ${errors.terms ? "accent-red-500" : "accent-teal-300"}`}
            />

            <label className="text-sm font-medium text-teal-50">
              I agree to the{" "}
              <button
                type="button"
                className="text-white underline transition-colors cursor-pointer hover:text-teal-200"
              >
                Terms and Conditions
              </button>
            </label>
          </div>

          <ErrorMessage message={errors.terms?.message} />

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-3 mt-4 font-bold text-white transition-colors bg-teal-800 rounded-md cursor-pointer hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-teal-600"
          >
            {isSubmitting ? "Loading..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-teal-100">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate(unauthenticatedRoutePaths.signIn)}
            className="font-semibold text-white underline transition-colors cursor-pointer hover:text-teal-200"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
