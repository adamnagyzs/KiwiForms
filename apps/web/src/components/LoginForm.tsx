import {
  authenticatedRoutePaths,
  unauthenticatedRoutePaths,
} from "@/config/router-paths";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import TextInput from "./TextInput";
import { authService } from "@/services/auth.service";

export default function LoginForm() {
  const navigate = useNavigate();

  const loginSchema = z.object({
    email: z.email(),
    password: z.string(),
  });

  type LoginForm = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const { mutateAsync } = useMutation({
    mutationFn: authService.signIn,
    onSuccess: () => {
      navigate(authenticatedRoutePaths.home);
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    const dto = {
      email: data.email,
      password: data.password,
    };

    await mutateAsync(dto);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-400/80">
      <div className="w-full max-w-md p-8 bg-teal-600 shadow-2xl rounded-xl">
        <h2 className="mb-8 text-2xl font-bold text-white">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
