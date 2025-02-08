import {
  Button,
  DateRangePicker,
  DateValue,
  RangeValue,
} from "@nextui-org/react";
import { useGetRecentDiagnostics } from "../query/diagnostic.query";
import { useGetMasterData } from "../query/master.query";
import { useGetNextConsults } from "../query/nextconsult.query";
import { useGetRegisteredPatientsByUser } from "../query/registerpatientbyuser.query";
import { useGetRegisteredPatients } from "../query/register.patient.query";
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

  const { data: dataNextConsults, refetch: handleGetNextConsults } =
    useGetNextConsults(
      rangeDate
        ? {
            startDate: moment(rangeDate.start.toString()).format("l"),
            endDate: moment(rangeDate.end.toString()).format("l"),
          }
        : undefined
    );

  const {
    data: dataRegisteredPatientsByUser,
    refetch: handleGetRegisteredPatientsByUser,
  } = useGetRegisteredPatientsByUser(
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
    console.log(dataNextConsults);
    console.log(dataRegisteredPatientsByUser);
    console.log(dataRegisteredPatients);
  }, [
    dataRecentDiagnostics,
    dataMaster,
    dataNextConsults,
    dataRegisteredPatientsByUser,
    dataRegisteredPatients,
  ]);

  const hadleClickExport = () => {
    if (item === 5) {
      handleGetRecentDiagnotics();
    } else if (item === 1) {
      handleGetMasterData();
    } else if (item === 2) {
      handleGetNextConsults();
    } else if (item === 3) {
      handleGetRegisteredPatientsByUser();
    } else if (item === 4) {
      handleGetRegisteredPatients();
    }
  };

  const getDataForExport = () => {
    if (item === 5) {
      return dataRecentDiagnostics;
    } else if (item === 1) {
      return dataMaster;
    } else if (item === 2) {
      return dataNextConsults;
    } else if (item === 3) {
      return dataRegisteredPatientsByUser;
    } else if (item === 4) {
      return dataRegisteredPatients;
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
