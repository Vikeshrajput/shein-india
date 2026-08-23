"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
const siteBasePath = apiBaseUrl.includes("localhost") ? "" : "/shein-india";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error ?? "Unable to log in");
      localStorage.setItem("shein_token", result.token);
      window.location.href = `${siteBasePath}/`;
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to log in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-86px)] items-center justify-center bg-[#f4f2f1] px-5 py-12">
      <section className="w-full max-w-[440px] border border-neutral-200 bg-white px-7 py-9 shadow-[0_12px_35px_rgba(0,0,0,0.08)] sm:px-10">
        <div className="mb-8 text-center">
          <p className="text-[25px] font-black tracking-[0.16em] text-black">SHEIN</p>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-neutral-900">Welcome back</h1>
          <p className="mt-2 text-sm text-neutral-500">Log in to continue shopping.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-neutral-700">
            Email address
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder="you@example.com"
              className="mt-2 h-12 w-full border border-neutral-300 px-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-black"
            />
          </label>

          <label className="block text-xs font-semibold uppercase tracking-[0.08em] text-neutral-700">
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              placeholder="Enter your password"
              className="mt-2 h-12 w-full border border-neutral-300 px-3 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-black"
            />
          </label>

          {error && <p className="text-sm text-red-600" role="alert">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="h-12 w-full bg-black text-sm font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-neutral-700"
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-neutral-500">
          New to SHEIN?{" "}
          <Link href="/login?mode=signup" className="font-semibold text-black underline underline-offset-4 hover:text-blue-600">
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}