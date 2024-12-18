import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../../config/axios.config";
import { IPatient } from "../../../../interfaces/patient.interface";
import { IPatientReqDto } from "../../../../Dto/Request/patient.req.dto";
import toast from "react-hot-toast";

const BASE_URL = "/patient";
export async function getAllPatient() {
  const { data } = await axiosInstance.get<IPatient[]>(BASE_URL);
  return data;
}

export async function AddPatient(params: IPatientReqDto) {
  await axiosInstance.post<IPatient>(BASE_URL, params);
}

export async function UpdatePatient(params: Partial<IPatientReqDto>) {
  await axiosInstance.put<IPatient>(BASE_URL, params);
}

export function useGetAllPatient() {
  return useQuery({
    queryKey: ["getAllPatient"],
    queryFn: getAllPatient,
  });
}

export function useAddPatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addPatient"],
    mutationFn: AddPatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPatient"] });
      toast.success("Paciente creado", {
        position: "top-right",
      });
    },
    onError: () => {
      toast.error("Error al crear paciente", {
        position: "top-right",
      });
    },
  });
}

export function useUpdatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updatePatient"],
    mutationFn: UpdatePatient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllPatient"] });
      toast.success("Paciente actualizado", {
        position: "top-right",
      });
    },
    onError: () => {
      toast.error("Error al actualizar paciente", {
        position: "top-right",
      });
    },
  });
}
