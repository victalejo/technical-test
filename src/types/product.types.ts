export interface Product {
  id: string;
  name: string;
  amount: number;
  comment: string;
  order: number;
}

export interface CreateProductRequest {
  name: string;
  amount: number;
  comment?: string;
}

export interface UpdateProductRequest {
  name?: string;
  amount?: number;
  comment?: string;
}

export interface ReorderRequest {
  orderedIds: string[];
}
