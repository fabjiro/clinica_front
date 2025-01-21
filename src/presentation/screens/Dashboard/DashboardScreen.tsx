import { LineChart } from "@mui/x-charts";
import { BaseScreen } from "../BaseScreen";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  useGetTopPatient,
  useGetConsultByDate,
  useGetPatientByDate,
} from "./querys/reports.query";
import { useMemo } from "react";
import moment from "moment";

export function DashboardScreen() {
  const { data: dataTopPatient, status: statusGetTopPatient } =
    useGetTopPatient();

  const { data: dataConsultByDate, isLoading: isLoadingConsult } = useGetConsultByDate();
  const { data: dataPatientByDate, isLoading: isLoadingPatient } = useGetPatientByDate();

  const { dataXaxis, dataCountConsult, dataCountPatatient } = useMemo(() => {
    if (!dataConsultByDate || !dataPatientByDate)
      return {
        dataXaxis: [],
        dataCountConsult: [],
        dataCountPatatient: [],
      };

    const dataXaxis = Array.from({ length: 7 }, (_, i) => {
      // get date utc
      const date = new Date();
      date.setDate(date.getDate() - i);
      return moment(date).format("l");
    }).reverse();

    // Inicializamos los datos con ceros
    const dataCountConsult = Array(dataXaxis.length).fill(0);
    const dataCountPatatient = Array(dataXaxis.length).fill(0);

    // Mapeamos los datos de movimiento a índices correspondientes
    for (let i = 0; i < dataXaxis.length; i++) {
      const formattedDate = moment(dataXaxis[i]).format("l");
      const consult = dataConsultByDate.find(
        (item) => moment(item.date).format("l") === formattedDate
      );
      const patient = dataPatientByDate.find(
        (item) => moment(item.date).format("l") === formattedDate
      );
      if (consult) {
        dataCountConsult[i] = consult.count;
      }
      if (patient) {
        dataCountPatatient[i] = patient.count;
      }
    }

    return {
      dataXaxis,
      dataCountConsult,
      dataCountPatatient,
    };
  }, [dataConsultByDate, dataPatientByDate]);

  return (
    <div>
      <BaseScreen titlePage="Dashboard">
        <div className="p-2 flex flex-col gap-4">
          <div className="bg-white flex flex-col  rounded-md shadow-md items-center justify-center">
            <h1 className="text-md font-semibold">Pacientes mas recurrentes</h1>

            {/* Gráfico de barras */}
            <div className="w-full flex">
              <BarChart
                dataset={(dataTopPatient ?? []).map((item) => ({
                  title: item.name ?? "",
                  cantidad: item.total ?? 0,
                }))}
                loading={statusGetTopPatient === "pending"}
                yAxis={[
                  {
                    dataKey: "title",
                    scaleType: "band",
                    // valueFormatter: (value) => (value ?? "").split(" ")[0],
                  },
                ]}
                series={[
                  {
                    dataKey: "cantidad",
                  },
                ]}
                layout="horizontal"
                width={400} // Tamaño igualado
                height={300} // Tamaño igualado
              />
            </div>
          </div>
          {/* Gráfico de líneas */}
          <div className="bg-white rounded-md shadow-md flex flex-col items-center justify-center">
            <h1 className="text-md font-semibold">Gráfico de líneas</h1>
            <LineChart
              series={[
                {
                  data: dataCountConsult,
                  label: "Consultas",
                  color: "green",
                },
                {
                  data: dataCountPatatient,
                  label: "Pacientes",
                  color: "yellow",
                },
              ]}
              xAxis={[{ data: dataXaxis, scaleType: "band" }]}
              className="flex-1"
              loading={isLoadingConsult || isLoadingPatient}
              width={500} // Tamaño igualado
              height={228} // Tamaño igualado
            />
          </div>
        </div>
      </BaseScreen>
    </div>
  );
}
