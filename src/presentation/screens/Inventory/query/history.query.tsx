import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { container } from "../../../../container";
import { InventoryRepository } from "../../../../domain/repository/inventory/inventory.repository";
import { TYPES } from "../../../../types";
import { IInventoryReqDto } from "../../../../domain/dto/request/inventory/inventoryReqDto";
import toast from "react-hot-toast";
import { IPaginationReqDto } from "../../../../domain/dto/request/PaginationReqDto";

const inventoryRepository = container.get<InventoryRepository>(
  TYPES.InventoryRepository
);

export const useGetHistory = ({ page, pageSize }:IPaginationReqDto) => {
  return useQuery({
    queryKey: ["getHistory", page],
    queryFn: () => inventoryRepository.getAll(page, pageSize),
    staleTime: 0,
    retry: 0,
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
    refetchOnReconnect: false
  });
};

export const useAddInventory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addInventory"],
    mutationFn: (inventory: IInventoryReqDto) =>
      inventoryRepository.addInventory(inventory),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["getHistory", 1] });
      queryClient.invalidateQueries({ queryKey: ["getAllProducts"] });
      
      toast.success("Inventario gestionado", {
        position: "top-right",
      })
    },
    onError: () => {
      toast.error("Error al gestionar inventario", {
        position: "top-right",
      });
    }
  });
};
