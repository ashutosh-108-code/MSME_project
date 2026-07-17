"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { AuthForm } from "../../../components/auth/AuthForm";
import { useAuth } from "../../../lib/AuthContext";

export default function SignupPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace("/onboarding/email-optin");
    }
  }, [isLoggedIn, router]);

  return <AuthForm initialMode="signup" />;
}
