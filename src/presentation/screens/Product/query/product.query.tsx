import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { container } from "../../../../container";
import { ProductRepository } from "../../../../domain/repository/product/product.repository";
import { TYPES } from "../../../../types";
import toast from "react-hot-toast";
import { CreateProductReqDto } from "../../../../domain/dto/request/product/createProduct.req.dto";
import { UpdateProductReqDto } from "../../../../domain/dto/request/product/updateProduct.req.dto";

const productRepository = container.get<ProductRepository>(
  TYPES.ProductRepository
);

export function useGetAllProducts() {
  return useQuery({
    queryKey: ["getAllProducts"],
    queryFn: () => productRepository.getAll(),
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: (id: string) => productRepository.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
      queryClient.invalidateQueries({ queryKey: ["getAllCategories"] });
      toast.success("Producto eliminado", {
        position: "top-right",
      });
    },
    onError: () => {
      toast.error("Error al eliminar producto", {
        position: "top-right",
      });
    },
  });
}

export function useAddProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addProduct"],
    mutationFn: (product: CreateProductReqDto) =>
      productRepository.add(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
      queryClient.invalidateQueries({ queryKey: ["getAllCategories"] });
      toast.success("Producto creado", {
        position: "top-right",
      });
    },
    onError: () => {
      toast.error("Error al crear producto", {
        position: "top-right",
      });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateProduct"],
    mutationFn: (product: UpdateProductReqDto) =>
      productRepository.update(product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
      queryClient.invalidateQueries({ queryKey: ["getAllCategories"] });
      toast.success("Producto actualizado", {
        position: "top-right",
      });
    },
    onError: () => {
      toast.error("Error al actualizar producto", {
        position: "top-right",
      });
    },
  });
}

export function useSearchProduct(param: string) {
  return useQuery({
    queryKey: ["searchProduct", param],
    queryFn: () => productRepository.searchProduct(param),
    retry: 0,
    refetchOnWindowFocus: false,
    enabled: false,
    refetchOnMount: false,
    retryOnMount: false,
    staleTime: 0,
  });
}
