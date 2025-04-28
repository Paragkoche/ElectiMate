"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signup } from "../_action/login.supabase";
import Link from "next/link";

// 1. Define the schema with zod
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// 2. Create TypeScript types from schema
type RegisterData = z.infer<typeof loginSchema>;

const RegisterForm = () => {
  // 3. Setup react-hook-form with zodResolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(loginSchema),
  });

  // 4. Submit handler
  const onSubmit = (data: RegisterData) => {
    signup(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card card-border bg-base-100 w-96">
        <div className="card-body">
          <h2 className="card-title">Login</h2>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email id</legend>
            <input
              type="text"
              className="input"
              placeholder="Email id"
              {...register("email")}
            />
            {errors.email && (
              <p className="label text-error">{errors.email.message}</p>
            )}
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              className="input"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <p className="label text-error">{errors.password.message}</p>
            )}
          </fieldset>

          <div className="card-actions justify-end">
            <Link href={"/login"}>
              <button type="button" className="btn btn-outline btn-full">
                Login
              </button>
            </Link>
            <button type="submit" className="btn btn-primary btn-full">
              Create
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
