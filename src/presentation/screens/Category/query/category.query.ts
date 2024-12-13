import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { container } from "../../../../container";
import { CategoryRepository } from "../../../../domain/repository/category/category.repository";
import { TYPES } from "../../../../types";
import toast from "react-hot-toast";
import { CreateCategoryReqDto } from "../../../../domain/dto/request/category/createCategory.req.dto";
import { UpdateCategoryReqDto } from "../../../../domain/dto/request/category/updateCategory.req.dto";

const categoryRepository = container.get<CategoryRepository>(
  TYPES.CategoryRepository
);

export function useGetAllCategories() {
  return useQuery({
    queryKey: ["getAllCategories"],
    queryFn: () => categoryRepository.getAll(),
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createCategory"],
    mutationFn: (category: CreateCategoryReqDto) =>
      categoryRepository.add(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllCategories"] });
      toast.success("Categoría creada", {
        position: "top-right",
      });
    },
    onError: () => {
      toast.error("Error al crear categoría", {
        position: "top-right",
      });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteCategory"],
    mutationFn: (id: string) => categoryRepository.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllCategories"] });
      toast.success("Categoría eliminada", {
        position: "top-right",
      });
    },
    onError: () => {
      toast.error("Error al eliminar categoría", {
        position: "top-right",
      });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateCategory"],
    mutationFn: (category: UpdateCategoryReqDto) =>
      categoryRepository.update(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllCategories"] });
      toast.success("Categoría actualizada", {
        position: "top-right",
      });
    },
    onError: () => {
      toast.error("Error al actualizar categoría", {
        position: "top-right",
      });
    },
  });
}
