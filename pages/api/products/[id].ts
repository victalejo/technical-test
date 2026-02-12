import { withAuth } from "@/api/auth.api";
import { handleApiError } from "@/api/error-handler.api";
import { ApiError } from "@/api/error-handler.api";
import { updateProduct, deleteProduct } from "@/server-service/products.service";

export default withAuth(async (req, res, user) => {
  const { id } = req.query;
  if (typeof id !== "string") {
    return res.status(400).json({ error: "Invalid product id" });
  }

  try {
    if (req.method === "PUT") {
      const { name, amount, comment } = req.body;
      const data: Record<string, unknown> = {};
      if (name !== undefined) data.name = name;
      if (amount !== undefined) data.amount = amount;
      if (comment !== undefined) data.comment = comment;

      if (Object.keys(data).length === 0) {
        throw new ApiError(400, "No fields to update");
      }

      const product = await updateProduct(user.id, id, data);
      return res.status(200).json(product);
    }

    if (req.method === "DELETE") {
      await deleteProduct(user.id, id);
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    return handleApiError(res, error);
  }
});
