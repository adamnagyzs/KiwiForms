import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

  console.log(errors);

  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-400/80">
      <div className="w-full max-w-lg p-8 bg-teal-600 shadow-2xl rounded-xl">
        <h2 className="mb-8 text-2xl font-bold text-white">
          Create an account!
        </h2>

        <form className="space-y-4 px-2" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block mb-1 text-sm font-medium text-teal-50">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 text-gray-900 bg-white border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-teal-50">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 text-gray-900 bg-white border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-teal-50">
              Confirm Password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 text-gray-900 bg-white border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-teal-50">
              Displayed Username
            </label>
            <input
              {...register("userName")}
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 text-gray-900 bg-white border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
          </div>

          <div className="flex gap-1.5">
            <input
              {...register("terms")}
              required
              type="checkbox"
              className="text-sm text-teal-100"
            />
            <label className="block mb-1 text-sm font-medium text-teal-50">
              I agree to the{" "}
              <button
                type="button"
                className="mt-1.5 text-white underline transition-colors cursor-pointer hover:text-teal-200"
              >
                Terms and Conditions
              </button>
            </label>
          </div>

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
            className="font-semibold text-white underline transition-colors cursor-pointer hover:text-teal-200"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
