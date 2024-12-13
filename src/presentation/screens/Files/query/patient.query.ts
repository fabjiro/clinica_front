import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../../config/axios.config";
import { IPatient } from "../../../../interfaces/patient.interface";

const BASE_URL = "/patient";
export async function getAllPatient() {
  const { data } = await axiosInstance.get<IPatient[]>(BASE_URL);
  return data;
}

export function useGetAllPatient() {
  return useQuery({
    queryKey: ["getAllPatient"],
    queryFn: getAllPatient,
  });
}
