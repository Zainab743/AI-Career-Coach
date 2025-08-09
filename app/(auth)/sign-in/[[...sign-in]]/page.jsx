"use client";

import { SignIn, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
  return (
    <SignIn
      path="/sign-in"
      routing="path"
      signUpUrl="/sign-up"
      afterSignInUrl="/" // 👈 Redirect after sign-up
    />
  );
}
