import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { IUpdateShopReqDto } from "../../../../domain/dto/request/shop/UpdateShop.req.dto";
import { container } from "../../../../container";
import { ShopRepository } from "../../../../domain/repository/shop/shop.repository";
import { TYPES } from "../../../../types";

const shopRepository = container.get<ShopRepository>(TYPES.ShopRepository);

export function useUpdateShop() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["updateShop"],
    mutationFn: (data: IUpdateShopReqDto) => shopRepository.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getMeShop"] });
      toast.success("Tienda actualizada", {
        position: "top-right",
      });
    },
    onError: () => {
      toast.error("Error al actualizar tienda", {
        position: "top-right",
      });
    },
  });
}
