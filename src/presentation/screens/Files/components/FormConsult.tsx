import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteSection,
  Button,
  DatePicker,
  Divider,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useGetAllPatient } from "../query/patient.query";
import { useGetExam } from "../query/exam.query";
import { FaFileImage } from "react-icons/fa6";
import { useFilePicker } from "use-file-picker";
import { useFormikConsult } from "../hooks/useFormilConsult";
import { parseAbsoluteToLocal } from "@internationalized/date";
import moment from "moment";
import { useEffect, useState } from "react";
import { useConsutlFormStore } from "../../../storage/form.storage";
import { FileUtils } from "../../../../utils/file.utils";
import { MODEFORMENUM } from "../../../../enum/mode/mode.enum";
import toast from "react-hot-toast";

export function FormConsult() {
  const { data: allPatient, status: statusGetAllPatient } = useGetAllPatient();
  const { data: allExamns, status: statusGetAllExam } = useGetExam();

  const toggleForm = useConsutlFormStore((state) => state.toggleForm);
  const modeForm = useConsutlFormStore((state) => state.modeForm);
  const {
    values,
    errors,
    setFieldValue,
    handleSubmit,
    addConsultStatus,
    updateConsultStatus,
  } = useFormikConsult();

  const { openFilePicker, plainFiles, loading, clear } = useFilePicker({
    accept: ".png, .jpg, .jpeg",
    multiple: false,
  });

  const isLoading =
    statusGetAllPatient === "pending" || statusGetAllExam === "pending";

  const isLoadingUpdateConsult = updateConsultStatus === "pending";
  const isLoadingAddConsult = addConsultStatus === "pending";

  const [noExam, setNoExam] = useState(true);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (addConsultStatus === "success" || updateConsultStatus === "success") {
      toggleForm();
    }
    if (
      modeForm === MODEFORMENUM.UPDATE &&
      values.examComplementary !== undefined
    ) {
      setNoExam(false);
    }
    console.log(values.examComplementary);
    console.log(values.image);

    if (plainFiles.length > 0) {
      (async () => {
        setFieldValue(
          "imageExam",
          await FileUtils.convertFileToBase64(plainFiles[0])
        );
        setFileName(plainFiles[0]?.name || "");
      })();
    }
    // console.log(allExamns);
  }, [addConsultStatus, updateConsultStatus, plainFiles, modeForm]);

  const handleSubmitForm = () => {
    // Verifica si hay un examen complementario seleccionado pero no hay imagen
    if (values.examComplementary && !plainFiles[0]?.name) {
      if (modeForm === MODEFORMENUM.CREATE) {
        // Muestra la advertencia para que el usuario suba una imagen
        toast.error("Debe subir una imagen del examen", {
          position: "top-right",
        });
      } else {
        handleSubmit();
      }
    } else if (values.examComplementary && modeForm === MODEFORMENUM.UPDATE) {
      handleSubmit();
    } else if (values.examComplementary === null) {
      setFieldValue("examComplementary", undefined);
      handleSubmit();
    } else {
      // Si la imagen está presente o no hay examen complementario, procede con el guardado
      handleSubmit();
    }
  };

  interface Group {
    id: string;
    name: string;
  }

  interface Exam {
    id: string;
    name: string;
    group: Group;
  }

  interface GroupedExam {
    idGroup: string;
    nameGroup: string;
    exams: {
      idExam: string;
      nameExam: string;
    }[];
  }

  const groupedExams: GroupedExam[] = [];

  if (allExamns && allExamns.length > 0) {
    allExamns.forEach((exam: Exam) => {
      const { id: examId, name: examName, group } = exam;
      const { id: groupId, name: groupName } = group;

      let groupFound = groupedExams.find((g) => g.idGroup === groupId);

      if (!groupFound) {
        groupFound = {
          idGroup: groupId,
          nameGroup: groupName,
          exams: [],
        };
        groupedExams.push(groupFound);
      }

      groupFound.exams.push({
        idExam: examId,
        nameExam: examName,
      });
    });
  }

  console.log(groupedExams);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col gap-4 w-10/12">
        <h1 className="text-2xl font-semibold">Consulta Médica</h1>
        <Divider />
        <Autocomplete
          isLoading={isLoading}
          isRequired
          defaultItems={allPatient ?? []}
          label="Paciente"
          size="sm"
          isInvalid={!!errors.patient}
          errorMessage={errors.patient}
          selectedKey={values.patient}
          onSelectionChange={(e) => setFieldValue("patient", e)}
        >
          {(item) => (
            <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
          )}
        </Autocomplete>
        <div className="flex flex-row gap-4">
          <Textarea
            value={values.motive}
            errorMessage={errors.motive}
            isInvalid={!!errors.motive}
            onChange={(e) => setFieldValue("motive", e.target.value)}
            isRequired
            label="Motivo"
          />
          <Textarea
            onChange={(e) => setFieldValue("clinicalhistory", e.target.value)}
            label="Historial clínico"
            value={values.clinicalhistory}
          />
        </div>
        <Divider />
        <h1 className="text-2xl font-semibold">Evaluacion Geriatrica</h1>
        <div className="flex flex-row gap-4">
          <Textarea
            onChange={(e) =>
              setFieldValue("bilogicalEvaluation", e.target.value)
            }
            label="Biológico"
            value={values.bilogicalEvaluation}
          />
          <Textarea
            onChange={(e) =>
              setFieldValue("psychologicalEvaluation", e.target.value)
            }
            label="Psicológico"
            value={values.psychologicalEvaluation}
          />
          <Textarea
            onChange={(e) => setFieldValue("socialEvaluation", e.target.value)}
            label="Social"
            value={values.socialEvaluation}
          />
          <Textarea
            onChange={(e) =>
              setFieldValue("functionalEvaluation", e.target.value)
            }
            label="Funcional"
            value={values.functionalEvaluation}
          />
        </div>
        <div className="flex flex-row gap-4">
          <Input
            isInvalid={!!errors.weight}
            errorMessage={errors.weight}
            isRequired
            size="sm"
            label="Peso"
            endContent="Kg"
            value={values.weight?.toString()}
            onChange={(e) => setFieldValue("weight", e.target.value)}
          />
          <Input
            isInvalid={!!errors.size}
            errorMessage={errors.size}
            isRequired
            size="sm"
            label="Estatura"
            endContent="Cm"
            value={values.size?.toString()}
            onChange={(e) => setFieldValue("size", e.target.value)}
          />
          <Input
            onChange={(e) => setFieldValue("pulse", e.target.value)}
            size="sm"
            label="Pulso"
            endContent="Lpm"
            value={values.pulse?.toString()}
          />
          <Input
            onChange={(e) => setFieldValue("oxygenSaturation", e.target.value)}
            size="sm"
            label="Saturación de oxigeno"
            endContent="%"
            value={values.oxygenSaturation?.toString()}
          />
        </div>
        <div className="flex flex-col">
          <h1>Presión arterial</h1>
          <div className="flex flex-row w-1/4 gap-4">
            <Input
              onChange={(e) =>
                setFieldValue("systolicPressure", e.target.value)
              }
              size="sm"
              label="Sistólica"
              value={values.systolicPressure?.toString()}
            />
            {/* <Button variant="light">/</Button> */}
            <Input
              onChange={(e) =>
                setFieldValue("diastolicPressure", e.target.value)
              }
              size="sm"
              label="Diastólica"
              value={values.diastolicPressure?.toString()}
            />
          </div>
        </div>

        <div className="flex flex-row gap-4">
          <Textarea
            isRequired
            isInvalid={!!errors.antecedentPerson}
            errorMessage={errors.antecedentPerson}
            value={values.antecedentPerson}
            onChange={(e) => setFieldValue("antecedentPerson", e.target.value)}
            label="Antecendentes Personales"
          />
          <Textarea
            onChange={(e) => setFieldValue("antecedentFamily", e.target.value)}
            label="Antecendentes Familiares"
            value={values.antecedentFamily}
          />
        </div>
        <div className="flex flex-row gap-4">
          {/* <Autocomplete
            isLoading={isLoading}
            defaultItems={allExamns ?? []}
            label="Examen complementario"
            size="sm"
            onSelectionChange={(e) => {
              setFieldValue("examComplementary", e);
              console.log(e);
              // Cambiar el valor de noExam dependiendo de si se seleccionó un examen
              setNoExam(e ? false : true); // Si hay un valor seleccionado, noExam será false, sino será true
            }}
            defaultSelectedKey={values.examComplementary}
          >
            {(item) => (
              <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
            )}
          </Autocomplete> */}
          <Autocomplete
            isLoading={isLoading}
            defaultItems={groupedExams ?? []}
            label="Examen complementario"
            size="sm"
            onSelectionChange={(e) => {
              setFieldValue("examComplementary", e);
              console.log(e);
              setNoExam(e ? false : true);
            }}
            defaultSelectedKey={values.examComplementary}
            disabledKeys={groupedExams.map((group) => group.idGroup)}
          >
            {groupedExams.map((group) => (
              <>
                <AutocompleteItem
                  key={group.idGroup}
                  isDisabled
                  style={{ color: "white", backgroundColor: "#0460ca" }}
                >
                  {group.nameGroup}
                </AutocompleteItem>
                {group.exams &&
                  group.exams.map((exam) => (
                    <AutocompleteItem key={exam.idExam}>
                      {exam.nameExam}
                    </AutocompleteItem>
                  ))}
              </>
            ))}
          </Autocomplete>

          <Textarea
            isRequired
            label="Diagnóstico"
            isInvalid={!!errors.diagnostic}
            errorMessage={errors.diagnostic}
            value={values.diagnostic}
            onChange={(e) => setFieldValue("diagnostic", e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-4">
          <Button
            variant="flat"
            onPress={openFilePicker}
            isLoading={loading}
            startContent={<FaFileImage />}
            color="primary"
            fullWidth
            isDisabled={noExam}
          >
            {fileName ? fileName : "Imagen del Examen"}
          </Button>
          <DatePicker
            isRequired
            label="Proxima cita"
            showMonthAndYearPickers
            value={
              (values.nextappointment &&
                parseAbsoluteToLocal(values.nextappointment)) ||
              undefined
            }
            isInvalid={!!errors.nextappointment}
            errorMessage={errors.nextappointment}
            onChange={(e) => {
              if (e?.toAbsoluteString) {
                setFieldValue("nextappointment", e?.toAbsoluteString());
              } else {
                setFieldValue(
                  "nextappointment",
                  new Date(e?.toString()!).toISOString()
                );
              }
            }}
            hideTimeZone={true}
            // granularity="day"
          />
        </div>
        <Textarea
          isRequired
          label="Receta"
          isInvalid={!!errors.recipe}
          errorMessage={errors.recipe}
          value={values.recipe}
          onChange={(e) => setFieldValue("recipe", e.target.value)}
        />

        <div className="flex flex-row gap-4 justify-end items-center">
          <Button onClick={() => toggleForm()}>Cancelar</Button>
          <Button
            onClick={() => handleSubmitForm()}
            isLoading={
              isLoading || isLoadingAddConsult || isLoadingUpdateConsult
            }
            //   disabled={isLoadingRoles}
            color="primary"
          >
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
}
