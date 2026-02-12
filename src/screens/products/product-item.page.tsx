import React, { useState } from "react";
import type { Product } from "@/types/product.types";
import { Input } from "@/layout/input.layout";
import { Button } from "@/layout/button.layout";
import { Label } from "@/layout/label.layout";
import { IconButton } from "@/layout/icon-button.layout";
import { Card } from "@/layout/card.layout";
import { Row } from "@/layout/row.layout";
import { ProductInfo } from "@/layout/product-info.layout";
import { Spacer } from "@/layout/spacer.layout";

interface ProductItemProps {
  product: Product;
  onUpdate: (id: string, data: { name: string; amount: number; comment: string }) => void;
  onDelete: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  isFirst: boolean;
  isLast: boolean;
}

export function ProductItem({ product, onUpdate, onDelete, onMoveUp, onMoveDown, isFirst, isLast }: ProductItemProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(product.name);
  const [amount, setAmount] = useState(String(product.amount));
  const [comment, setComment] = useState(product.comment);

  const handleSave = () => {
    onUpdate(product.id, { name, amount: Number(amount), comment });
    setEditing(false);
  };

  const handleCancel = () => {
    setName(product.name);
    setAmount(String(product.amount));
    setComment(product.comment);
    setEditing(false);
  };

  if (editing) {
    return (
      <ProductItemEdit
        name={name}
        amount={amount}
        comment={comment}
        onNameChange={setName}
        onAmountChange={setAmount}
        onCommentChange={setComment}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <ProductItemDisplay
      product={product}
      onEdit={() => setEditing(true)}
      onDelete={() => onDelete(product.id)}
      onMoveUp={() => onMoveUp(product.id)}
      onMoveDown={() => onMoveDown(product.id)}
      isFirst={isFirst}
      isLast={isLast}
    />
  );
}

interface ProductItemEditProps {
  name: string;
  amount: string;
  comment: string;
  onNameChange: (v: string) => void;
  onAmountChange: (v: string) => void;
  onCommentChange: (v: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

function ProductItemEdit({ name, amount, comment, onNameChange, onAmountChange, onCommentChange, onSave, onCancel }: ProductItemEditProps) {
  return (
    <Card>
      <Label>Name</Label>
      <Input value={name} onChange={onNameChange} placeholder="Name" />
      <Spacer size="sm" />
      <Label>Amount</Label>
      <Input value={amount} onChange={onAmountChange} placeholder="Amount" type="number" />
      <Spacer size="sm" />
      <Label>Comment</Label>
      <Input value={comment} onChange={onCommentChange} placeholder="Comment" />
      <Spacer />
      <Row gap="sm">
        <Button onClick={onSave}>Save</Button>
        <Button onClick={onCancel} variant="secondary">Cancel</Button>
      </Row>
    </Card>
  );
}

interface ProductItemDisplayProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

function ProductItemDisplay({ product, onEdit, onDelete, onMoveUp, onMoveDown, isFirst, isLast }: ProductItemDisplayProps) {
  return (
    <Card>
      <Row>
        <IconButton onClick={onMoveUp} label="Move up" disabled={isFirst}>↑</IconButton>
        <IconButton onClick={onMoveDown} label="Move down" disabled={isLast}>↓</IconButton>
        <ProductInfo name={product.name} amount={product.amount} comment={product.comment} />
        <IconButton onClick={onEdit} label="Edit">✎</IconButton>
        <IconButton onClick={onDelete} label="Delete">✕</IconButton>
      </Row>
    </Card>
  );
}
