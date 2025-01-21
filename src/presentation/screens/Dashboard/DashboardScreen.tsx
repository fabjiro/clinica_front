import { LineChart } from "@mui/x-charts";
import { BaseScreen } from "../BaseScreen";
import { BarChart } from "@mui/x-charts/BarChart";
import { useGetTopPatient, useGetConsultByDate } from "./querys/reports.query";

export function DashboardScreen() {
  const { data: dataTopPatient, status: statusGetTopPatient } =
    useGetTopPatient();

  const { data: dataConsultByDate, status: statusGetConsultByDate } =
    useGetConsultByDate();

  console.log(dataConsultByDate);

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
              series={
                [
                  // {
                  //   data: dataInput,
                  //   label: "Consulta",
                  //   color: "green",
                  // },
                  // {
                  //   data: dataAjustment,
                  //   color: "yellow",
                  //   label: "Ajuste",
                  // },
                  // {
                  //   data: dataOutput,
                  //   color: "red",
                  //   label: "Salida",
                  // },
                ]
              }
              // xAxis={[{ data: dataXaxis, scaleType: "band" }]}
              // className="flex-1"
              // loading={isLoading}
            />
          </div>
        </div>
      </BaseScreen>
    </div>
  );
}
