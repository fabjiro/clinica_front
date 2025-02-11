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
import autoTable from "jspdf-autotable";

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
    // Obtener los datos de la consulta
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

    console.log("Consult Data:", consult);
    // Crear un nuevo documento PDF
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth(); // Obtiene el ancho de la página
    const text = "Consulta médica";
    const textWidth = doc.getTextWidth(text); // Obtiene el ancho del texto

    // Configurar fuente en negrita
    doc.setFont("helvetica", "bold");

    // Escribir texto centrado
    doc.text(text, (pageWidth - textWidth) / 2, 20);
    // Saltos de línea
    let currentY = 30; // Comienza en y = 30 después del encabezado

    autoTable(doc, {
      startY: currentY, // Comienza la tabla después de los saltos de línea
      body: [
        [
          {
            content: "Nombre del paciente:",
            styles: {
              fontStyle: "bold",
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
            colSpan: 2,
          },
          {
            content: "Fecha consulta:",
            styles: {
              fontStyle: "bold",
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
            colSpan: 2,
          },
        ],
        [
          {
            content: consult.patient?.name || "N/A",
            colSpan: 2,
            styles: {
              lineColor: [0, 0, 0],
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
          {
            content: new Date(consult.createdAt).toLocaleDateString() || "N/A",
            colSpan: 2,
            styles: {
              lineColor: [0, 0, 0],
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
        ],
        // Segunda fila que se ve como encabezado
        [
          {
            content: "Motivo:",
            styles: {
              fontStyle: "bold",
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
            colSpan: 1,
          },
          {
            content: "Peso:",
            styles: {
              fontStyle: "bold",
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
            colSpan: 1,
          },
          {
            content: "Tamaño:",
            styles: {
              fontStyle: "bold",
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
            colSpan: 1,
          },
          {
            content: "Pulso",
            styles: {
              fontStyle: "bold",
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
            colSpan: 1,
          },
        ],
        [
          {
            content: consult.motive || "N/A",
            colSpan: 1,
            styles: {
              lineColor: [0, 0, 0],
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
          {
            content: consult.weight ? `${consult.weight} kg` : "N/A",
            styles: {
              lineColor: [0, 0, 0],
              halign: "center",
              textColor: [0, 0, 0],
            },
            colSpan: 1,
          },
          {
            content: consult.size ? `${consult.size} cm` : "N/A",
            colSpan: 1,
            styles: {
              lineColor: [0, 0, 0],
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
          {
            content: consult.pulse ? `${consult.pulse} Lpm` : "N/A",
            colSpan: 1,
            styles: {
              lineColor: [0, 0, 0],
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
        ],
        [
          {
            content: "Saturacion de Oxígeno:",
            styles: {
              fontStyle: "bold",
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
            colSpan: 1,
          },
          {
            content: "Presión Arterial:",
            styles: {
              fontStyle: "bold",
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
            colSpan: 1,
          },
          {
            content: "Historial clínico:",
            styles: {
              fontStyle: "bold",
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
            colSpan: 2,
          },
        ],
        [
          {
            content: consult.oxygenSaturation
              ? `${consult.oxygenSaturation}%`
              : "N/A",
            styles: {
              lineColor: [0, 0, 0],
              halign: "center",
              textColor: [0, 0, 0],
            },
            colSpan: 1,
          },
          {
            content:
              consult.systolicPressure && consult.diastolicPressure
                ? `${consult.systolicPressure}/${consult.diastolicPressure} mmHg`
                : "N/A",
            colSpan: 1,
            styles: {
              lineColor: [0, 0, 0],
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
          {
            content: consult.clinicalhistory || "N/A",
            colSpan: 2,
            styles: {
              lineColor: [0, 0, 0],
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
        ],
      ],
      theme: "grid",
    });

    // Obtener la posición actual después de la primera tabla
    const finalY = (doc as any).lastAutoTable?.finalY || 10; // Espaciado de 10 unidades

    // Encabezado de Evaluación Geriátrica
    const textt = "Evaluación Geriátrica";
    const textWidthh = doc.getTextWidth(textt); // Corrige la variable usada
    const pageWidthh = doc.internal.pageSize.getWidth(); // Obtiene el ancho de la página

    doc.setFont("helvetica", "bold");
    doc.text(textt, (pageWidthh - textWidthh) / 2, finalY + 10); // Coloca el texto debajo de la primera tabla

    // Segunda tabla (Evaluación Geriátrica)

    autoTable(doc, {
      startY: finalY + 20,
      body: [
        [
          {
            content: "Evaluacion Biologica",
            styles: {
              fontStyle: "bold",
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
            colSpan: 2,
          },
          {
            content: "Evalucaion Psicologica:",
            styles: {
              fontStyle: "bold",
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
            colSpan: 2,
          },
        ],
        [
          {
            content: consult.bilogicalEvaluation || "N/A",
            colSpan: 2,
            styles: {
              lineColor: [0, 0, 0],
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
          {
            content: consult.psychologicalEvaluation || "N/A",
            colSpan: 2,
            styles: {
              lineColor: [0, 0, 0],
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
        ],
        [
          {
            content: "Evaluacion Social",
            styles: {
              fontStyle: "bold",
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
            colSpan: 2,
          },
          {
            content: "Evaluacion Funcional:",
            styles: {
              fontStyle: "bold",
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
            colSpan: 2,
          },
        ],
        [
          {
            content: consult.socialEvaluation || "N/A",
            colSpan: 2,
            styles: {
              lineColor: [0, 0, 0],
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
          {
            content: consult.functionalEvaluation || "N/A",
            colSpan: 2,
            styles: {
              lineColor: [0, 0, 0],
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
        ],
      ],
      theme: "grid",
    });

    const finalY2 = (doc as any).lastAutoTable?.finalY || finalY + 10;
    const textResultados = "Resultados y Diagnósticos";
    const textWidthResultados = doc.getTextWidth(textResultados);

    doc.setFont("helvetica", "bold");
    doc.text(
      textResultados,
      (pageWidth - textWidthResultados) / 2,
      finalY2 + 10
    );
    autoTable(doc, {
      startY: finalY2 + 20,
      body: [
        [
          {
            content: "Diagnostico:",
            styles: {
              fontStyle: "bold",
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
            colSpan: 2,
          },
          {
            content: "Receta:",
            styles: {
              fontStyle: "bold",
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
            colSpan: 2,
          },
        ],
        [
          {
            content: consult.diagnosis || "N/A",
            colSpan: 2,
            styles: {
              lineColor: [0, 0, 0],
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
          {
            content: consult.recipe || "N/A",
            colSpan: 2,
            styles: {
              lineColor: [0, 0, 0],
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
        ],
        [
          {
            content: "Registrado por:",
            styles: {
              fontStyle: "bold",
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
            colSpan: 2,
          },
          {
            content: "Proxima Cita:",
            styles: {
              fontStyle: "bold",
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
            colSpan: 2,
          },
        ],
        [
          {
            content: consult.userCreatedBy?.name || "N/A",
            colSpan: 2,
            styles: {
              lineColor: [0, 0, 0],
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
          {
            content: consult.nextappointment
              ? new Date(consult.nextappointment).toLocaleDateString()
              : "N/A",
            colSpan: 2,
            styles: {
              lineColor: [0, 0, 0],
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
        ],
      ],
      theme: "grid",
    });

    // Guardar el PDF con el nombre del paciente o un nombre genérico si es null
    const fileName = consult.patient?.name
      ? `Consulta_Medica_${consult.patient.name}.pdf`
      : "Consulta_Medica.pdf";

    // Guardar el archivo
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
