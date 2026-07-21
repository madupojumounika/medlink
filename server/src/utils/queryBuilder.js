export const buildQuery = (query, defaultSort = { createdAt: -1 }, searchFields = []) => {
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 10;
  const skip = (page - 1) * limit;
  const sort = query.sort ? { [query.sort]: query.order === "asc" ? 1 : -1 } : defaultSort;
  
  const filter = { isActive: true }; // Soft delete filter

  // Handle search across multiple fields
  if (query.search && searchFields.length > 0) {
    const searchRegex = { $regex: query.search, $options: "i" };
    filter.$or = searchFields.map(field => ({ [field]: searchRegex }));
  }

  return { filter, options: { page, limit, skip, sort } };
};
