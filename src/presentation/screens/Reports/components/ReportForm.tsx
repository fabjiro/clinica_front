import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DateRangePicker,
  DateValue,
  RangeValue,
  Spinner,
} from "@nextui-org/react";
import { useGetRecentDiagnostics } from "../query/diagnostic.query";
import { useGetMasterData } from "../query/master.query";
import { useGetNextConsults } from "../query/nextconsult.query";
import { useGetRegisteredPatientsByUser } from "../query/registerpatientbyuser.query";
import { useGetRegisteredPatients } from "../query/register.patient.query";
import { useGetRecentConsults } from "../query/consult.query";
import { useEffect, useState } from "react";
import { useReportFormStore } from "../../../storage/form.storage";
import moment from "moment";
import * as XLSX from "xlsx";
import { SiCcleaner } from "react-icons/si";
import toast from "react-hot-toast";
import { useGetAllUsers } from "../../Users/query/user.query";
import { useFormikUser } from "../../Users/hooks/useFormikUser";
import { RiAiGenerate } from "react-icons/ri";
import { HiOutlineDownload } from "react-icons/hi";

interface ReportData {
  [key: string]: string | number | boolean | null;
}

export const ReportForm = () => {
  const item = useReportFormStore((state) => state.item);
  const [rangeDate, setRangeDate] = useState<RangeValue<DateValue>>();

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [isReady, setIsReady] = useState<boolean | null>(false);

  const { data: allUser, status: statusGetAllUser } = useGetAllUsers();

  const isLoading = statusGetAllUser === "pending";

  const toggleForm = useReportFormStore((state) => state.toggleForm);

  const { setFieldValue } = useFormikUser();

  const { data: dataRecentDiagnostics, refetch: handleGetRecentDiagnostics } =
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
    rangeDate && selectedUserId // Solo si el rango de fechas y el userId están definidos
      ? {
          startDate: moment(rangeDate.start.toString()).format("l"),
          endDate: moment(rangeDate.end.toString()).format("l"),
          userId: selectedUserId, // Aquí pasamos el userId
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

  const { data: dataConsult, refetch: handleGetConsult } = useGetRecentConsults(
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
    console.log(dataConsult);

    if (isReady) {
      toast.success("Datos listos para descargar el reporte creada", {
        position: "top-right",
      });
    }
  }, [
    dataRecentDiagnostics,
    dataMaster,
    dataNextConsults,
    dataRegisteredPatientsByUser,
    dataRegisteredPatients,
    dataConsult,
    isReady,
  ]);

  const handleClickExport = async () => {
    setLoading(true);
    try {
      if (item === 6) await handleGetRecentDiagnostics();
      else if (item === 4) await handleGetConsult();
      else if (item === 2) await handleGetNextConsults();
      else if (item === 5) await handleGetRegisteredPatientsByUser();
      else if (item === 1) await handleGetRegisteredPatients();
      else if (item === 3) await handleGetMasterData();
    } finally {
      setLoading(false);
      setIsReady(true);
    }
  };

  const getDataForExport = (): ReportData[] => {
    const filterDataMaster = (data: ReportData[] | undefined) =>
      data
        ? data.map(({ registerBy, ...rest }) => ({
            ...rest,
          }))
        : [];

    const filterDataRegisteredPatients = (data: ReportData[] | undefined) =>
      data
        ? data.map(
            ({ rol, avatar, civilStatus, typeSex, birthday, ...rest }) => ({
              ...rest,
              civilStatusName:
                typeof civilStatus === "object" && civilStatus !== null
                  ? (civilStatus as { name: string }).name // Aseguramos que civilStatus es un objeto con la propiedad name
                  : "", // Si no es un objeto o no tiene name, se devuelve una cadena vacía
              typeSex:
                typeSex === "6274ba64-08f7-4f5b-ac4a-eb82849351b4"
                  ? "Masculino"
                  : "Femenino",
              birthday:
                typeof birthday === "string"
                  ? birthday.split("T")[0]
                  : birthday ?? "", // Devuelve "" si es undefined o null
            })
          )
        : [];

    const filterDataNextConsults = (data: ReportData[] | undefined) =>
      data
        ? data.map(({ nextAppointment, ...rest }) => ({
            ...rest,
            nextcite:
              typeof nextAppointment === "string"
                ? nextAppointment.replace("T", " ").replace("Z", "") // Cambia 'T' por espacio y elimina 'Z'
                : "", // Devuelve "" si nextAppointment es undefined o no es una cadena
          }))
        : [];

    const filterDataByUser = (data: ReportData[] | undefined) =>
      data
        ? data.map(({ createdAt, ...rest }) => ({
            ...rest,
            createDate:
              typeof createdAt === "string"
                ? createdAt.replace("T", " ").split(".")[0] // Dividir por 'T' y quedarnos solo con la fecha
                : "", // Devuelve "" si createdAt no es una cadena
          }))
        : [];
    const filterDataDiagnostic = (data: ReportData[] | undefined) =>
      data
        ? data.map(({ createdAt, userCreatedBy, ...rest }) => ({
            ...rest,
            createDate:
              typeof createdAt === "string"
                ? createdAt.split("T")[0] // Dividir por 'T' y quedarnos solo con la fecha
                : "", // Devuelve "" si createdAt no es una cadena

            userCreatedByName:
              typeof userCreatedBy === "object" && userCreatedBy !== null
                ? (userCreatedBy as { name: string }).name
                : "",
          }))
        : [];

    const filterDataConsult = (data: ReportData[] | undefined) =>
      data
        ? data.map(
            ({
              id,
              patientId,
              patient,
              complementaryTest,
              userCreatedBy,
              count,
              createdAt,
              image,
              ...rest
            }) => {
              const patientName =
                typeof patient === "object" && patient !== null
                  ? (patient as { name: string }).name
                  : ""; // Aseguramos que patient es un objeto con la propiedad name

              const complementaryTestName =
                typeof complementaryTest === "object" &&
                complementaryTest !== null
                  ? (complementaryTest as { name: string }).name
                  : "";

              const userCreatedByName =
                typeof userCreatedBy === "object" && userCreatedBy !== null
                  ? (userCreatedBy as { name: string }).name
                  : "";

              const CreatedAtt =
                typeof createdAt === "string"
                  ? createdAt.replace("T", " ").split(".")[0] // Cambia 'T' por espacio y elimina 'Z'
                  : ""; // Devuelve "" si createdAt es undefined o no es una cadena

              // Reorganizamos el objeto para que `patientName` esté en la segunda posición
              return {
                id,
                patientId,
                patientName, // Se coloca al principio
                CreatedAtt,
                ...rest, // El resto de las propiedades se mantienen
                userCreatedByName,
                complementaryTestName,
              };
            }
          )
        : [];

    if (item === 6) {
      return filterDataDiagnostic(dataRecentDiagnostics) || [];
    } else if (item === 4) {
      return filterDataConsult(dataConsult) || [];
    } else if (item === 2) {
      return filterDataNextConsults(dataNextConsults) || [];
    } else if (item === 5) {
      return filterDataByUser(dataRegisteredPatientsByUser) || [];
    } else if (item === 1) {
      return filterDataRegisteredPatients(dataRegisteredPatients || []);
    } else if (item === 3) {
      return filterDataMaster(dataMaster) || [];
    }
    return [];
  };

  const exportToExcel = () => {
    const data = getDataForExport();
    if (data.length === 0) {
      toast.error("No hay datos para exportar", {
        position: "top-right",
      });
      toggleForm();
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");

    // Autoajustar el ancho de las columnas
    worksheet["!cols"] = Object.keys(data[0]).map((key) => ({
      wch: Math.max(
        ...data.map((row) => {
          const valueLength = String(row[key]).length;
          return valueLength > 40 ? 40 : valueLength; // Limita a 40 caracteres como máximo
        }),
        key.length
      ),
    }));

    // Autoajustar el alto de las filas para textos largos
    worksheet["!rows"] = data.map((row) => ({
      hpx: Math.max(
        20,
        Object.values(row).some((val) => String(val).length > 50) ? 40 : 20
      ),
    }));

    XLSX.writeFile(workbook, "Reporte.xlsx");
    setIsReady(false);
    toggleForm();
  };

  return (
    <div>
      <div className="flex flex-col gap-4 items-center justify-center">
        {item !== undefined && item >= 2 && item <= 6 && (
          <>
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
          </>
        )}

        <div className="w-full max-w-xs flex flex-col gap-2">
          {item === 5 && (
            <Autocomplete
              isLoading={isLoading}
              isRequired
              defaultItems={allUser ?? []}
              label="Usuario"
              size="sm"
              onSelectionChange={(e) => {
                const selectedUser = allUser?.find((user) => user.id === e);
                setSelectedUserId(selectedUser ? selectedUser.id : null);
              }}
            >
              {(item) => (
                <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
              )}
            </Autocomplete>
          )}

          <Button
            onPress={handleClickExport}
            fullWidth
            color="success"
            isDisabled={isReady === true} // Se deshabilita solo si isReady es true
            startContent={<RiAiGenerate />}
          >
            {loading ? <Spinner size="sm" /> : "Generar Reporte"}
          </Button>

          <Button
            onPress={exportToExcel}
            color="primary"
            fullWidth
            isDisabled={isReady === false}
          >
            <HiOutlineDownload /> Descargar Reporte en Excel
          </Button>
        </div>
      </div>
    </div>
  );
};
