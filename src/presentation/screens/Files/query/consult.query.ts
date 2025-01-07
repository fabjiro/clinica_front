import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../../../config/axios.config";
import { IConsultReqDto } from "../../../../Dto/Request/consult.req.dto";
import toast from "react-hot-toast";

const BASE_URL = "/consult";

export async function createConsult(params: IConsultReqDto) {
  await axiosInstance.post<IConsultReqDto>(BASE_URL, params);
}

export async function useCreateConsult() {
  return useMutation({
    mutationKey: ["createConsult"],
    mutationFn: createConsult,
    onSuccess: () => {
      toast.success("Consulta creada", {
        position: "top-right",
      });
    },
    onError: () => {
      toast.error("Error al crear consulta", {
        position: "top-right",
      });
    }
  });
}
