import {
  Button,
  DateRangePicker,
  DateValue,
  RangeValue,
} from "@nextui-org/react";
import { useGetRecentDiagnostics } from "../query/diagnostic.query";
import { useGetMasterData } from "../query/master.query";
import { useGetRegisteredPatients } from "../query/register.patient.query"; // Importa el hook
import { useEffect, useState } from "react";
import { useReportFormStore } from "../../../storage/form.storage";
import moment from "moment";
import CsvDownloadButton from "react-json-to-csv";
import { SiCcleaner } from "react-icons/si";

export const ReportForm = () => {
  const item = useReportFormStore((state) => state.item);

  const [rangeDate, setRangeDate] = useState<RangeValue<DateValue>>();

  const { data: dataRecentDiagnostics, refetch: handleGetRecentDiagnotics } =
    useGetRecentDiagnostics(
      rangeDate
        ? {
            startDate: moment(rangeDate.start.toString()).format("l"),
            endDate: moment(rangeDate.end.toString()).format("l"),
          }
        : undefined
    );

  const { data: dataMaster, refetch: handleGetMasterData } = useGetMasterData(
    rangeDate
      ? {
          startDate: moment(rangeDate.start.toString()).format("l"),
          endDate: moment(rangeDate.end.toString()).format("l"),
        }
      : undefined
  );

  const { data: dataRegisteredPatients, refetch: handleGetRegisteredPatients } =
    useGetRegisteredPatients(
      rangeDate
        ? {
            startDate: moment(rangeDate.start.toString()).format("l"),
            endDate: moment(rangeDate.end.toString()).format("l"),
          }
        : undefined
    );

  useEffect(() => {
    console.log(dataRecentDiagnostics);
    console.log(dataMaster);
    console.log(dataRegisteredPatients); // Agrega esto para depuración
  }, [dataRecentDiagnostics, dataMaster, dataRegisteredPatients]);

  const hadleClickExport = () => {
    if (item === 5) {
      handleGetRecentDiagnotics();
    } else if (item === 1) {
      handleGetMasterData(); // Llama al endpoint "master" cuando item es 1
    } else if (item === 4) {
      handleGetRegisteredPatients(); // Llama al endpoint "register-patient" cuando item es 4
    }
  };

  const getDataForExport = () => {
    if (item === 5) {
      return dataRecentDiagnostics;
    } else if (item === 1) {
      return dataMaster; // Devuelve los datos del endpoint "master"
    } else if (item === 4) {
      return dataRegisteredPatients; // Devuelve los datos del endpoint "register-patient"
    }
    return [];
  };

  return (
    <div>
      <div className="flex flex-col gap-4 items-center justify-center">
        <p>Por Rango de fechas</p>

        <div className="flex gap-2 items-center">
          <DateRangePicker
            value={rangeDate ?? null}
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
          <Button
            onPress={() => {
              setRangeDate(undefined);
            }}
            fullWidth
          >
            <SiCcleaner />
          </Button>
        </div>

        <div className="w-full max-w-xs flex flex-col gap-2">
          <Button onPress={hadleClickExport} fullWidth color="success">
            Generar Reporte
          </Button>
          <Button color="primary" fullWidth>
            <CsvDownloadButton data={getDataForExport()}>
              Descargar Reporte en excel
            </CsvDownloadButton>
          </Button>
        </div>
      </div>
    </div>
  );
};
