import { useQuery } from "@tanstack/react-query";
import { container } from "../../../container";
import { ShopRepository } from "../../../domain/repository/shop/shop.repository";
import { TYPES } from "../../../types";

const shopRepository = container.get<ShopRepository>(TYPES.ShopRepository);

export function useGetMeShop() {
  return useQuery({
    queryKey: ["getMeShop"],
    queryFn: () => shopRepository.getShop(),
  });
}
