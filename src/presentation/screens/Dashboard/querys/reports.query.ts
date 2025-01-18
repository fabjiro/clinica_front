import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../../config/axios.config";
import { IReport } from "../../../../interfaces/reports.interface";


const BASE_URL = "/report";

export async function getTopPatient() {
    const { data } = await axiosInstance.get<IReport[]>(
      `${BASE_URL}/top-patient-by-consult`
    );
    return data;
}

export function useGetTopPatient() {
  return useQuery({
    queryKey: ["getTopPatient"],
    queryFn: getTopPatient,
  });
}







