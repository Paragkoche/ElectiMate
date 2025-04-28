"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/client-ssr";

export async function login(client_data: { email: string; password: string }) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: client_data.email,
    password: client_data.password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return {
      status: 401,
      message: error.message,
    };
  }

  redirect("/");
}

export async function signup(client_data: { email: string; password: string }) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: client_data.email,
    password: client_data.password,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    return {
      status: 401,
      message: error.message,
    };
  }

  redirect("/");
}
