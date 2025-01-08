import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../../config/axios.config";
import { IConsultReqDto } from "../../../../Dto/Request/consult.req.dto";
import toast from "react-hot-toast";
import { IConsult } from "../../../../interfaces/consult.interface";

const BASE_URL = "/consult";

export async function getConsultByPatientId(patientId: string) {
  const { data } = await axiosInstance.get<IConsult[]>(`${BASE_URL}/${patientId}`);
  return data;
}


export async function createConsult(params: IConsultReqDto) {
  await axiosInstance.post<IConsultReqDto>(BASE_URL, params);
}

export function useGetConsultByPatientId(patientId: string) {
  return useQuery({
    queryKey: ["getConsultByPatientId", patientId],
    queryFn: () => getConsultByPatientId(patientId),
  });
}

export function useCreateConsult() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createConsult"],
    mutationFn: createConsult,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPatient"] });
      
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
