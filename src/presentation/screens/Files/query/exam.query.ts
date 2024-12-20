import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../../../config/axios.config";
import { IExam } from "../../../../interfaces/exam.interface";
import { IExamReqDto } from "../../../../Dto/Request/exam.req.dto";
import toast from "react-hot-toast";

const BASE_URL = "/Exam";

export async function GetAllExam() {
        const { data } = await axiosInstance.get<IExam[]>(BASE_URL);
        return data;
}

export function useGetExam() {
    return useQuery({
      queryKey: ["getAllExam"],
      queryFn: GetAllExam,
    });
}

export async function AddExam(params: IExamReqDto) {
    await axiosInstance.post<IExam>(BASE_URL, params);
}


export function useAddExam() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationKey: ["addExam"],
      mutationFn: AddExam,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getAllExam"] });
        toast.success("Examen creado", {
          position: "top-right",
        });
      },
      onError: () => {
        toast.error("Error al crear Examen", {
          position: "top-right",
        });
      },
    });
  }