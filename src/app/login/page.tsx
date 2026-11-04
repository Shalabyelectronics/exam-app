"use client";
import { useActionState } from "react";
import { signIn } from "./actions";
export default function Login() {
  const [state, action, pending] = useActionState(signIn, { error: "" });
  return (
    <form action={action}>
      <p role="alert">{state.error}</p>
      <div>
        <label htmlFor="username">username:</label>
        <input id="username" name="username"></input>
      </div>
      <div>
        <label htmlFor="password">password:</label>
        <input id="password" type="password" name="password"></input>
      </div>

      <button type="submit">{pending ? "Signing in..." : "Sign in"}</button>
    </form>
  );
}
