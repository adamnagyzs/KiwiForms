import { unauthenticatedRoutePaths } from "@/config/router-paths";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../ui/Input";
import supabase from "@/libs/supabase";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function LoginForm() {
  const loginSchema = z.object({
    email: z.email(),
    password: z.string(),
  });

  type LoginForm = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setError("root", {
        type: "manual",
        message: "Invalid email or password",
      });
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-400/80">
      <div className="w-full max-w-md p-8 bg-teal-600 shadow-2xl rounded-xl">
        <h2 className="mb-8 text-2xl font-bold text-white">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            error={errors.email?.message}
            {...register("email")}
            type="email"
            placeholder="Email"
          />
          <Input
            label="Password"
            error={errors.password?.message}
            {...register("password")}
            type="password"
            placeholder="Password"
          />

          {errors.root && <ErrorMessage message={errors.root.message} />}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-4 py-3 mt-6 font-bold text-white transition-colors bg-teal-800 rounded-md cursor-pointer hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-teal-600"
          >
            {isSubmitting ? "Logging in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-teal-100">
          Don't have an account?{" "}
          <Link
            to={unauthenticatedRoutePaths.signUp}
            className="font-semibold text-white underline transition-colors cursor-pointer hover:text-teal-200"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
