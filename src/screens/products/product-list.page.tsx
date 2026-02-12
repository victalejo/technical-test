import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import type { Product } from "@/types/product.types";
import type { SessionUser } from "@/types/auth.types";
import { PageContainer } from "@/layout/page-container.layout";
import { Heading } from "@/layout/heading.layout";
import { Spacer } from "@/layout/spacer.layout";
import { Row } from "@/layout/row.layout";
import { Button } from "@/layout/button.layout";
import { LoadingSpinner } from "@/layout/loading-spinner.layout";
import { ErrorMessage } from "@/layout/error-message.layout";
import { EmptyState } from "@/layout/empty-state.layout";
import { ProductForm } from "./product-form.page";
import { ProductItem } from "./product-item.page";
import * as productsService from "@/service/products.service";
import * as authService from "@/service/auth.service";

export function ProductListScreen() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    authService.getMe()
      .then((data) => {
        setUser(data.user);
        return productsService.fetchProducts();
      })
      .then((prods) => setProducts(prods))
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return <PageContainer><LoadingSpinner /></PageContainer>;
  }

  const handleAdd = (data: { name: string; amount: number; comment: string }) => {
    setFormLoading(true);
    setFormError("");
    productsService.createProduct(data)
      .then((product) => setProducts((prev) => [...prev, product]))
      .catch((err) => setFormError(err.error || "Failed to add product"))
      .finally(() => setFormLoading(false));
  };

  const handleUpdate = (id: string, data: { name: string; amount: number; comment: string }) => {
    productsService.updateProduct(id, data)
      .then((updated) => setProducts((prev) => prev.map((p) => (p.id === id ? updated : p))))
      .catch((err) => setError(err.error || "Failed to update"));
  };

  const handleDelete = (id: string) => {
    productsService.deleteProduct(id)
      .then(() => setProducts((prev) => prev.filter((p) => p.id !== id)))
      .catch((err) => setError(err.error || "Failed to delete"));
  };

  const handleMove = (id: string, direction: -1 | 1) => {
    const index = products.findIndex((p) => p.id === id);
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= products.length) return;

    const reordered = [...products];
    [reordered[index], reordered[newIndex]] = [reordered[newIndex], reordered[index]];
    const orderedIds = reordered.map((p) => p.id);

    setProducts(reordered);
    productsService.reorderProducts(orderedIds)
      .then((updated) => setProducts(updated))
      .catch((err) => setError(err.error || "Failed to reorder"));
  };

  const handleLogout = () => {
    authService.logout().then(() => router.push("/login"));
  };

  return (
    <PageContainer>
      <Row justify="between">
        <Heading>My Products</Heading>
        <ProductListHeader email={user?.email || ""} onLogout={handleLogout} />
      </Row>
      <Spacer />
      <ProductForm onSubmit={handleAdd} error={formError} loading={formLoading} />
      <Spacer />
      <ErrorMessage message={error} />
      <ProductListItems
        products={products}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onMove={handleMove}
      />
    </PageContainer>
  );
}

interface ProductListHeaderProps {
  email: string;
  onLogout: () => void;
}

function ProductListHeader({ email, onLogout }: ProductListHeaderProps) {
  return (
    <Row gap="sm">
      <span>{email}</span>
      <Button onClick={onLogout} variant="secondary">Logout</Button>
    </Row>
  );
}

interface ProductListItemsProps {
  products: Product[];
  onUpdate: (id: string, data: { name: string; amount: number; comment: string }) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, direction: -1 | 1) => void;
}

function ProductListItems({ products, onUpdate, onDelete, onMove }: ProductListItemsProps) {
  if (products.length === 0) {
    return <EmptyState title="No products yet" subtitle="Add your first product above" />;
  }

  return (
    <>
      {products.map((product, index) => (
        <React.Fragment key={product.id}>
          <ProductItem
            product={product}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onMoveUp={(id) => onMove(id, -1)}
            onMoveDown={(id) => onMove(id, 1)}
            isFirst={index === 0}
            isLast={index === products.length - 1}
          />
          <Spacer size="sm" />
        </React.Fragment>
      ))}
    </>
  );
}
