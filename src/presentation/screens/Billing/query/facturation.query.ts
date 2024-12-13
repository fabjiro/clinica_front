import { useMutation } from "@tanstack/react-query";
import { IAddBillingReqDto } from "../../../../domain/dto/request/billing/AddBillingReqDto";
import { container } from "../../../../container";
import { BillingRepository } from "../../../../domain/repository/billing/billing.repository";
import { TYPES } from "../../../../types";
import toast from "react-hot-toast";

const bullingRepository = container.get<BillingRepository>(
  TYPES.BillingRepository
);

export function useAddFacturation() {
  return useMutation({
    mutationKey: ["facturation"],
    mutationFn: (data: IAddBillingReqDto) => bullingRepository.addBilling(data),
    onSuccess: () => {
      toast.success("Facturación creada", {
        position: "top-right",
      });
    },
    onError: () => {
      toast.error("Error al crear facturación", {
        position: "top-right",
      });
    },
  });
}
