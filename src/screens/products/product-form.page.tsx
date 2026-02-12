import React, { useState } from "react";
import { Input } from "@/layout/input.layout";
import { Button } from "@/layout/button.layout";
import { Label } from "@/layout/label.layout";
import { Spacer } from "@/layout/spacer.layout";
import { Card } from "@/layout/card.layout";
import { Heading } from "@/layout/heading.layout";
import { ErrorMessage } from "@/layout/error-message.layout";

interface ProductFormProps {
  onSubmit: (data: { name: string; amount: number; comment: string }) => void;
  error: string;
  loading: boolean;
}

export function ProductForm({ onSubmit, error, loading }: ProductFormProps) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, amount: Number(amount), comment });
    setName("");
    setAmount("");
    setComment("");
  };

  return (
    <Card>
      <Heading subtitle="Fill in the details below">Add Product</Heading>
      <Spacer />
      <form onSubmit={handleSubmit}>
        <Label>Name</Label>
        <Input value={name} onChange={setName} placeholder="Product name" />
        <Spacer size="sm" />
        <Label>Amount</Label>
        <Input value={amount} onChange={setAmount} placeholder="0" type="number" />
        <Spacer size="sm" />
        <Label>Comment</Label>
        <Input value={comment} onChange={setComment} placeholder="Optional comment" />
        <Spacer size="sm" />
        <ErrorMessage message={error} />
        <Spacer size="sm" />
        <Button type="submit" disabled={loading || !name.trim() || !amount} fullWidth>
          {loading ? "Adding..." : "Add Product"}
        </Button>
      </form>
    </Card>
  );
}
