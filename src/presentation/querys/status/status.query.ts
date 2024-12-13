import { useQuery } from "@tanstack/react-query";
import { container } from "../../../container";
import { StatusRepository } from "../../../domain/repository/status/status.repository";
import { TYPES } from "../../../types";

const statusRepository = container.get<StatusRepository>(
  TYPES.StatusRepository
);
export function useGetAllStatus() {
  return useQuery({
    queryKey: ["getAllStatus"],
    queryFn: () => statusRepository.getAll(),
  });
}
