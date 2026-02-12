import React, { useState } from "react";
import { Input } from "@/layout/input.layout";
import { Button } from "@/layout/button.layout";
import { Label } from "@/layout/label.layout";
import { Spacer } from "@/layout/spacer.layout";
import { ErrorMessage } from "@/layout/error-message.layout";

interface LoginFormProps {
  onSubmit: (email: string) => void;
  error: string;
  loading: boolean;
}

export function LoginForm({ onSubmit, error, loading }: LoginFormProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label>Email</Label>
      <Input
        value={email}
        onChange={setEmail}
        placeholder="you@example.com"
        type="email"
        name="email"
      />
      <Spacer size="sm" />
      <ErrorMessage message={error} />
      <Spacer size="sm" />
      <Button type="submit" disabled={loading || !email.trim()} fullWidth>
        {loading ? "Entering..." : "Enter"}
      </Button>
    </form>
  );
}
