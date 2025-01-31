import {
  Button,
  DateRangePicker,
  DateValue,
  RangeValue,
} from "@nextui-org/react";
import { useGetRecentDiagnostics } from "../query/diagnostic.query";
import { useEffect, useState } from "react";
import { useReportFormStore } from "../../../storage/form.storage";
import moment from "moment";

export const ReportForm = () => {
  const item = useReportFormStore((state) => state.item);

  const [rangeDate, setRangeDate] = useState<RangeValue<DateValue>>();

  const { data: dataRecentDiagnostics, refetch: handleGetRecentDiagnotics } =
    useGetRecentDiagnostics(
      rangeDate
        ? {
            startDate: moment(rangeDate.start).format("l"),
            endDate: moment(rangeDate.end).format("l"),
          }
        : undefined
    );

  useEffect(() => {
    console.log(dataRecentDiagnostics);
  }, [dataRecentDiagnostics]);

  const hadleClickExport = () => {
    if (item === 5) {
      handleGetRecentDiagnotics();
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2 items-center justify-center">
        <p>Por Rango de fechas</p>
        <DateRangePicker
          onChange={(value) => {
            if (value !== null) {
              setRangeDate(value);
            }
          }}
          size="md"
          className="max-w-xs"
          granularity="day"
          fullWidth
        />
        <Button onPress={hadleClickExport} fullWidth color="success">
          Exportar
        </Button>
      </div>
    </div>
  );
};
