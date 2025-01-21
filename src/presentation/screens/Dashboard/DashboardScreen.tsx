import { LineChart } from "@mui/x-charts";
import { BaseScreen } from "../BaseScreen";
import { BarChart } from "@mui/x-charts/BarChart";
import { useGetTopPatient } from "./querys/reports.query";

export function DashboardScreen() {
  const { data: dataTopPatient, status: statusGetTopPatient } =
    useGetTopPatient();

  console.log(dataTopPatient);

  // (dataTopPatient ?? []).map((item) => ({
  //   title: item.Name ?? "",
  //   cantidad: item.Total ?? 0,
  // }));

  return (
    <div>
      <BaseScreen titlePage="Dashboard">
        <div className="p-2">
          <div className="flex bg-white rounded-md shadow-md">
            {/* Gráfico de barras */}
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
                  label: "Cantidad de consultas",
                },
              ]}
              layout="horizontal"
              width={400} // Tamaño igualado
              height={300} // Tamaño igualado
            />
          </div>
          {/* Gráfico de líneas */}
          <div className="bg-white rounded-md shadow-md">

            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
              yAxis={[{ data: [5, 15, 25, 35, 40, 50] }]}
              series={[
                {
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                  area: true,
                },
              ]}
              width={500} // Tamaño igualado
              height={228} // Tamaño igualado
              className="flex-1"
            />
          </div>
        </div>
      </BaseScreen>
    </div>
  );
}
