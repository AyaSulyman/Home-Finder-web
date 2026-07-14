import { apiRequest } from "./apiClient";

export interface Category {
  _id: string;
  name: string;
  image: string;
  description: string;
  propertyCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryInput {
  name: string;
  image: string;
  description: string;
  propertyCount?: number;
}

// Fetch all categories
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const data = await apiRequest<Category[]>('/categories', {
      method: 'GET',
    });
    return data;
  } catch (error) {
    throw error;
  }
};

// Create a new category
export const createCategory = async (categoryData: CategoryInput): Promise<Category> => {
  try {
    const data = await apiRequest<Category>('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
    return data;
  } catch (error) {
    throw error;
  }
};

// Update a category
export const updateCategory = async (id: string, categoryData: Partial<CategoryInput>): Promise<Category> => {
  try {
    const data = await apiRequest<Category>(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
    });
    return data;
  } catch (error) {
    throw error;
  }
};

// Delete a category
export const deleteCategory = async (id: string): Promise<void> => {
  try {
    await apiRequest<void>(`/categories/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    throw error;
  }
};

// Get single category
export const fetchCategoryById = async (id: string): Promise<Category> => {
  try {
    const data = await apiRequest<Category>(`/categories/${id}`, {
      method: 'GET',
    });
    return data;
  } catch (error) {
    throw error;
  }
};