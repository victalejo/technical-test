import React, { useState } from "react";
import { useRouter } from "next/router";
import { PageContainer } from "@/layout/page-container.layout";
import { Card } from "@/layout/card.layout";
import { LoginForm } from "./login-form.page";
import { login } from "@/service/auth.service";

export function LoginScreen() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (email: string) => {
    setLoading(true);
    setError("");
    login(email)
      .then(() => router.push("/"))
      .catch((err) => setError(err.error || "Login failed"))
      .finally(() => setLoading(false));
  };

  return (
    <PageContainer>
      <Card>
        <LoginForm onSubmit={handleLogin} error={error} loading={loading} />
      </Card>
    </PageContainer>
  );
}
