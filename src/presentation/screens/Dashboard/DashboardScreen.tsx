import { LineChart } from "@mui/x-charts";
import { BaseScreen } from "../BaseScreen";
import { BarChart } from "@mui/x-charts/BarChart";

export function DashboardScreen() {
  const chartSetting = {
    yAxis: [
      {
        label: "rainfall (mm)",
      },
    ],
    series: [{ dataKey: "seoul", label: "Seoul rainfall" }],
    height: 300,
    // sx: {
    //   [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
    //     transform: 'translateX(-10px)',
    //   },
    // },
  };

  const dataset = [
    {
      london: 10,
      paris: 10,
      newYork: 10,
      seoul: 10,
      month: "Jan",
    },
    {
      london: 10,
      paris: 10,
      newYork: 10,
      seoul: 10,
      month: "Feb",
    },
    {
      london: 10,
      paris: 10,
      newYork: 10,
      seoul: 10,
      month: "Mar",
    },
    {
      london: 10,
      paris: 10,
      newYork: 10,
      seoul: 10,
      month: "Apr",
    },
    {
      london: 10,
      paris: 10,
      newYork: 10,
      seoul: 10,
      month: "May",
    },
  ];

  return (
    <div>
      <BaseScreen titlePage="Dashboard">
        <div className="flex flex-row space-x-4">
          <BarChart
            dataset={dataset}
            xAxis={[{ scaleType: "band", dataKey: "month" }]}
            {...chartSetting}
            width={500} // Tamaño igualado
            height={300} // Tamaño igualado
          />

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
            height={300} // Tamaño igualado
          />
        </div>
      </BaseScreen>
    </div>
  );
}
