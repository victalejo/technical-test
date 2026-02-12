import type { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "@/api/auth.api";
import { handleApiError } from "@/api/error-handler.api";
import { ApiError } from "@/api/error-handler.api";
import { getProducts, createProduct } from "@/server-service/products.service";

export default withAuth(async (req, res, user) => {
  try {
    if (req.method === "GET") {
      const products = await getProducts(user.id);
      return res.status(200).json(products);
    }

    if (req.method === "POST") {
      const { name, amount, comment } = req.body;
      if (!name || typeof name !== "string") {
        throw new ApiError(400, "Name is required");
      }
      if (amount === undefined || typeof amount !== "number") {
        throw new ApiError(400, "Amount must be a number");
      }
      const product = await createProduct(user.id, { name, amount, comment });
      return res.status(201).json(product);
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    return handleApiError(res, error);
  }
});
