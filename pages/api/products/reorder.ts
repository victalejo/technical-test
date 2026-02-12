import { withAuth } from "@/api/auth.api";
import { handleApiError } from "@/api/error-handler.api";
import { ApiError } from "@/api/error-handler.api";
import { reorderProducts } from "@/server-service/products.service";

export default withAuth(async (req, res, user) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { orderedIds } = req.body;
    if (!Array.isArray(orderedIds)) {
      throw new ApiError(400, "orderedIds must be an array");
    }
    const products = await reorderProducts(user.id, orderedIds);
    return res.status(200).json(products);
  } catch (error) {
    return handleApiError(res, error);
  }
});
