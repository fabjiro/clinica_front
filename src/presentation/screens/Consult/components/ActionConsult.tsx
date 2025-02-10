import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { MdEdit, MdDelete } from "react-icons/md";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoMdDocument } from "react-icons/io";
import { useConfirmStore } from "../../../storage/confim.storage";
import { useDeleteConsult } from "../../Files/query/consult.query";
import { useQueryClient } from "@tanstack/react-query";
import { IConsult } from "../../../../interfaces/consult.interface";
import { MODEFORMENUM } from "../../../../enum/mode/mode.enum";
import { useConsutlFormStore } from "../../../storage/form.storage";
import { useParams } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

interface IProps {
  id: string;
}

export function ActionConsult({ id }: IProps) {
  const { mutate: handleDeleteConsult, status: statusDelete } =
    useDeleteConsult();
  const { patientId } = useParams();
  const showConfirm = useConfirmStore((state) => state.showConfirm);
  const clientQuery = useQueryClient();
  const { toggleForm, setItem, setModeForm } = useConsutlFormStore();

  const handleUpdate = () => {
    const consult = (
      clientQuery.getQueryData<IConsult[]>([
        "getConsultByPatientId",
        patientId,
      ]) ?? []
    ).find((param) => param.id === id);

    console.log("Consult Data:", consult);

    if (!consult) return;

    setItem(consult);
    setModeForm(MODEFORMENUM.UPDATE);
    toggleForm();
  };

  const handleDelete = () => {
    showConfirm("Eliminar", "¿Desea eliminar el consulta?", () => {
      handleDeleteConsult(id);
    });
  };

  const handleGeneratePDF = () => {
    const consult = (
      clientQuery.getQueryData<IConsult[]>([
        "getConsultByPatientId",
        patientId,
      ]) ?? []
    ).find((param) => param.id === id);

    if (!consult) {
      alert("No se encontró la consulta.");
      return;
    }

    const doc = new jsPDF();
    const marginLeft = 20;
    let y = 30;
    const rowHeight = 10; // Altura base de la fila

    // Título centrado
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Consulta Médica", 105, 20, { align: "center" });

    doc.setFontSize(12);

    // Dibujar la tabla con encabezados y valores
    const content = [
      {
        label: "Fecha:",
        value: new Date(consult.createdAt).toLocaleDateString() || "N/A",
      },
      { label: "Nombre del paciente:", value: consult.patient?.name || "N/A" },
      { label: "Motivo:", value: consult.motive || "N/A" },
      {
        label: "Evaluación Biológica:",
        value: consult.bilogicalEvaluation || "N/A",
      },
      {
        label: "Evaluación Psicológica:",
        value: consult.psychologicalEvaluation || "N/A",
      },
      { label: "Evaluación Social:", value: consult.socialEvaluation || "N/A" },
      {
        label: "Evaluación Funcional:",
        value: consult.functionalEvaluation || "N/A",
      },
      {
        label: "Historial clinico:",
        value: consult.clinicalhistory || "N/A",
      },
      {
        label: "Peso:",
        value: consult.weight ? `${consult.weight} kg` : "N/A",
      },
      { label: "Tamaño:", value: consult.size ? `${consult.size} cm` : "N/A" },
      { label: "Pulso:", value: consult.pulse || "N/A" },
      {
        label: "Saturación de Oxígeno:",
        value: consult.oxygenSaturation || "N/A",
      },
      {
        label: "Presión Arterial:",
        value:
          consult.systolicPressure && consult.diastolicPressure
            ? `${consult.systolicPressure}/${consult.diastolicPressure} mmHg`
            : "N/A",
      },
      { label: "Diagnóstico:", value: consult.diagnosis || "N/A" },
      { label: "Médico:", value: consult.userCreatedBy?.name || "N/A" },
      {
        label: "Antecedentes Personales:",
        value: consult.antecedentPersonal || "N/A",
      },
      {
        label: "Antecedentes Familiares:",
        value: consult.antecedentFamily || "N/A",
      },
      {
        label: "Exámenes Complementarios:",
        value: consult.complementaryTest || "N/A",
      },
      { label: "Receta:", value: consult.recipe || "N/A" },
      {
        label: "Próxima cita:",
        value: consult.nextappointment
          ? new Date(consult.nextappointment).toLocaleDateString()
          : "N/A",
      },
      { label: "Imagen del Examen:", value: consult.imageExamId || "N/A" },
    ];

    content.forEach(({ label, value }, index) => {
      const labelWidth = 60; // Ancho para las celdas de etiquetas
      const valueWidth = 120; // Ancho para las celdas de valores
      const centerXLabel = marginLeft + labelWidth / 2; // Centrar texto de la etiqueta
      const centerXValue = marginLeft + labelWidth + valueWidth / 2; // Centrar texto del valor

      // Cuadro gris claro para los encabezados (etiquetas)
      doc.setFillColor(220, 220, 220);
      doc.rect(marginLeft, y, labelWidth, rowHeight, "F"); // Rectángulo para la etiqueta

      // Cuadro transparente para los valores
      doc.setFillColor(255, 255, 255); // Blanco
      doc.rect(marginLeft + labelWidth, y, valueWidth, rowHeight, "F"); // Rectángulo para el valor

      // Texto en los encabezados (centrado)
      doc.setFont("helvetica", "bold");
      doc.text(label, centerXLabel, y + 6, { align: "center" }); // Texto del encabezado centrado

      // Texto en los valores con ajuste automático de líneas (centrado)
      doc.setFont("helvetica", "normal");
      const splitValue = doc.splitTextToSize(value, valueWidth); // Ajustar el texto al tamaño de la columna de valor
      doc.text(splitValue, centerXValue, y + 6, { align: "center" }); // Texto del valor centrado

      // Dibujar las líneas de separación en negro
      doc.setDrawColor(0, 0, 0); // Color de las líneas (negro)
      doc.rect(marginLeft, y, labelWidth, rowHeight); // Línea para la etiqueta
      doc.rect(
        marginLeft + labelWidth,
        y,
        valueWidth,
        rowHeight * splitValue.length
      ); // Línea para el valor, ajustando la altura

      // Actualizar la posición 'y' después de la fila
      y += rowHeight * splitValue.length; // Mover a la siguiente fila

      // Verificar si la posición 'y' excede el límite de la página (por ejemplo, 270)
      if (y > 270) {
        doc.addPage(); // Agregar una nueva página
        y = 30; // Reiniciar la posición 'y' para la nueva página
      }
    });

    // Guardar el PDF con el nombre del paciente o un nombre genérico si es null
    const fileName = consult.patient?.name
      ? `Consulta_Medica_${consult.patient.name}.pdf`
      : "Consulta_Medica.pdf";

    doc.save(fileName);
  };

  const isLoading = statusDelete === "pending";

  return (
    <div className="flex flex-row gap-2 items-center justify-center h-full w-full">
      <Dropdown backdrop="blur" className="rounded-md">
        <DropdownTrigger>
          <Button isLoading={isLoading} size="sm" isIconOnly variant="light">
            <FaEllipsisVertical />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem
            startContent={<HiOutlineClipboardDocumentList />}
            key="recipe"
          >
            Generar Receta
          </DropdownItem>
          <DropdownItem
            startContent={<IoMdDocument />}
            key="generate"
            onPress={handleGeneratePDF}
          >
            Generar Consulta
          </DropdownItem>
          <DropdownItem
            onPress={handleUpdate}
            showDivider
            startContent={<MdEdit />}
            key="edit"
          >
            Editar
          </DropdownItem>
          <DropdownItem
            className="text-danger"
            color="danger"
            key="delete"
            startContent={<MdDelete />}
            onPress={handleDelete}
          >
            Eliminar
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
