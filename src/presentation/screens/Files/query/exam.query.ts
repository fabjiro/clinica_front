import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../../config/axios.config";
import { IExam } from "../../../../interfaces/exam.interface";

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