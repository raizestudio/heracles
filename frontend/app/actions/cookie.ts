"use server";

import { cookies } from "next/headers";

export async function setCookie(name: string, value: string): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(name, value, { path: "/", httpOnly: false });
}

export async function getCookie(name: string): Promise<string | null> {
  const cookieStore = await cookies();

  const cookie = cookieStore.get(name);
  return cookie ? cookie.value : null;
}

export async function deleteCookie(name: string): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete(name);
}