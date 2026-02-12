import type { Product, CreateProductRequest, UpdateProductRequest } from "@/types/product.types";

export function fetchProducts(): Promise<Product[]> {
  return fetch("/api/products").then((res) => {
    if (!res.ok) return res.json().then((e) => Promise.reject(e));
    return res.json();
  });
}

export function createProduct(data: CreateProductRequest): Promise<Product> {
  return fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) return res.json().then((e) => Promise.reject(e));
    return res.json();
  });
}

export function updateProduct(id: string, data: UpdateProductRequest): Promise<Product> {
  return fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => {
    if (!res.ok) return res.json().then((e) => Promise.reject(e));
    return res.json();
  });
}

export function deleteProduct(id: string): Promise<void> {
  return fetch(`/api/products/${id}`, { method: "DELETE" }).then((res) => {
    if (!res.ok) return res.json().then((e) => Promise.reject(e));
  });
}

export function reorderProducts(orderedIds: string[]): Promise<Product[]> {
  return fetch("/api/products/reorder", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderedIds }),
  }).then((res) => {
    if (!res.ok) return res.json().then((e) => Promise.reject(e));
    return res.json();
  });
}
