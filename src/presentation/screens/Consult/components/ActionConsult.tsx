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
import { PDFDocument, rgb, PDFPage } from "pdf-lib";
import { saveAs } from "file-saver";

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

    console.log(consult);

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

    // const pageWidth = doc.internal.pageSize.getWidth(); // Obtiene el ancho de la página
    // const text = "Consulta médica";
    // const textWidth = doc.getTextWidth(text); // Obtiene el ancho del texto

    // // Configurar fuente en negrita
    // doc.setFont("helvetica", "bold");

    // // Escribir texto centrado
    // doc.text(text, (pageWidth - textWidth) / 2, 20);

    // doc.addImage(
    //   "https://dl.dropboxusercontent.com/scl/fi/1dkv94n2vwvnjmpd03yj8/e2ed39fa-ed26-44c4-955d-11ce1231afc8.jpeg?rlkey=syzmyq0gi6fbc90oy5ttrx2qt&dl=0",
    //   "JPEG", // Formato de la imagen
    //   10, // Posición X
    //   10, // Posición Y
    //   10, // Ancho
    //   10 // Alto
    // );

    // // Agregar los textos
    // doc.setFontSize(6); // Establecer tamaño de fuente pequeño
    // doc.text("Hola", 20, 15); // Texto "Hola" al lado de la imagen
    // doc.text("Adios", 20, 20); // Texto "Adios" debajo de "Hola"
    // doc.text("xdxdxdxd", 20, 25); // Texto "xdxdxdxd" debajo de "Adios"

    // Saltos de línea
    let currentY = 30; // Comienza en y = 30 después del encabezado

    autoTable(doc, {
      startY: currentY, // Comienza la tabla después de los saltos de línea
      body: [
        [
          {
            content: "Consulta Médica",
            styles: {
              fontStyle: "bold",
              fontSize: 14,
              fillColor: [0, 76, 153],
              lineColor: [0, 0, 0],
              textColor: [255, 255, 255],
              halign: "center",
            },
            colSpan: 4,
          },
        ],
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
    // const finalY = (doc as any).lastAutoTable?.finalY || 10; // Espaciado de 10 unidades

    // // Encabezado de Evaluación Geriátrica
    // const textt = "Evaluación Geriátrica";
    // const textWidthh = doc.getTextWidth(textt); // Corrige la variable usada
    // const pageWidthh = doc.internal.pageSize.getWidth(); // Obtiene el ancho de la página

    // doc.setFont("helvetica", "bold");
    // doc.text(textt, (pageWidthh - textWidthh) / 2, finalY + 10); // Coloca el texto debajo de la primera tabla

    // Segunda tabla (Evaluación Geriátrica)

    autoTable(doc, {
      // startY: finalY + 20,
      body: [
        [
          {
            content: "Evaluación Geriátrica",
            styles: {
              fontStyle: "bold",
              fontSize: 14,
              fillColor: [0, 76, 153],
              lineColor: [0, 0, 0],
              textColor: [255, 255, 255],
              halign: "center",
            },
            colSpan: 4,
          },
        ],
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

    // const finalY2 = (doc as any).lastAutoTable?.finalY || finalY + 10;
    // const textResultados = "Resultados y Diagnósticos";
    // const textWidthResultados = doc.getTextWidth(textResultados);

    // doc.setFont("helvetica", "bold");
    // doc.text(
    //   textResultados,
    //   (pageWidth - textWidthResultados) / 2,
    //   finalY2 + 10
    // );
    autoTable(doc, {
      // startY: finalY2 + 20,
      body: [
        [
          {
            content: "Resultados y Diagnósticoss",
            styles: {
              fontStyle: "bold",
              fontSize: 14,
              fillColor: [0, 76, 153],
              lineColor: [0, 0, 0],
              textColor: [255, 255, 255],
              halign: "center",
            },
            colSpan: 4,
          },
        ],
        [
          {
            content: "Examen Complementario:",
            styles: {
              fontStyle: "bold",
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
            colSpan: 2,
          },
          {
            content: consult.complementaryTest?.name || "N/A",
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
            content: consult.nextappointment || "N/A",
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

    if (consult.image) {
      if (consult.image.originalUrl) {
        doc.addPage();
        doc.addImage(consult.image.originalUrl, 10, 30, 190, 150);
      }
    }

    // Guardar el PDF con el nombre del paciente o un nombre genérico si es null
    const fileName = consult.patient?.name
      ? `Consulta_Medica_${consult.patient.name}_${
          consult.createdAt.split("T")[0]
        }.pdf`
      : "Consulta_Medica.pdf";

    // Guardar el archivo
    doc.save(fileName);
  };

  const handleGenerateRecipePDF = async () => {
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
    try {
      // URL del PDF existente o carga un archivo local esta en la carpeta public de proyecto
      const existingPdfUrl = "../../../../../public/receta medica.pdf";
      const existingPdfBytes = await fetch(existingPdfUrl).then((res) =>
        res.arrayBuffer()
      );

      // Cargar el PDF existente
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      // Obtener la primera página
      const firstPage = pdfDoc.getPages()[0];

      // Escribir en coordenadas específicas (ajusta los valores según el diseño del PDF)
      firstPage.drawText(consult.patient?.name || "N/A", {
        x: 122,
        y: 458,
        size: 10,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(consult.createdAt.split("T")[0] || "N/A", {
        x: 322,
        y: 458,
        size: 10,
        color: rgb(0, 0, 0),
      });

      // firstPage.drawText(
      //   new Date(consult.createdAt).toLocaleDateString() || "N/A",
      //   {
      //     x: 322,
      //     y: 458,
      //     size: 12,
      //     color: rgb(0, 0, 0),
      //   }
      // );

      firstPage.drawText(
        calculateAge(consult.patient?.birthday || "N/A").toString(),
        {
          x: 90,
          y: 435,
          size: 12,
          color: rgb(0, 0, 0),
        }
      );

      firstPage.drawText(
        consult.patient?.typeSex === "c2594acf-bb7c-49d0-9506-f556179670ab"
          ? "Masculino"
          : "Femeninio",
        {
          x: 195,
          y: 435,
          size: 10,
          color: rgb(0, 0, 0),
        }
      );

      firstPage.drawText(consult.weight ? `${consult.weight} kg` : "N/A", {
        x: 330,
        y: 435,
        size: 12,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(consult.diagnosis || "N/A", {
        x: 110,
        y: 412,
        size: 12,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(consult.nextappointment || "N/A", {
        x: 50,
        y: 77,
        size: 10,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText(consult.userCreatedBy?.name || "N/A", {
        x: 290,
        y: 50,
        size: 10,
        color: rgb(0, 0, 0),
      });

      drawWrappedText(firstPage, consult.recipe || "N/A", 50, 360, 12, 15);

      // Guardar el nuevo PDF
      const modifiedPdfBytes = await pdfDoc.save();

      // Descargar el archivo
      const blob = new Blob([modifiedPdfBytes], { type: "application/pdf" });
      const fileName = `Receta_Medica_${consult.patient?.name}_${
        consult.createdAt.split("T")[0]
      }.pdf`;
      saveAs(blob, fileName);
    } catch (error) {
      console.error("Error generando la receta:", error);
    }
  };

  /**
   * Divide el texto en líneas según un ancho máximo de caracteres.
   */
  function splitTextIntoLines(text: string, maxLength: number): string[] {
    const words = text.split(" ");
    const lines: string[] = [];
    let currentLine = "";

    for (const word of words) {
      if ((currentLine + word).length > maxLength) {
        lines.push(currentLine.trim());
        currentLine = word + " ";
      } else {
        currentLine += word + " ";
      }
    }

    if (currentLine.trim().length > 0) {
      lines.push(currentLine.trim());
    }

    return lines;
  }

  /**
   * Dibuja texto con saltos de línea en una página PDF.
   */
  function drawWrappedText(
    page: PDFPage,
    text: string,
    x: number,
    y: number,
    fontSize: number,
    lineHeight: number
  ) {
    const maxWidth = 50; // Define el ancho máximo en caracteres antes de hacer un salto de línea
    const lines = splitTextIntoLines(text, maxWidth);
    let currentY = y;

    for (const line of lines) {
      page.drawText(line, {
        x,
        y: currentY,
        size: fontSize,
        color: rgb(0, 0, 0),
      });
      currentY -= lineHeight; // Mueve hacia abajo la posición del texto
    }
  }

  const calculateAge = (birthday: string): number => {
    const birthDate = new Date(birthday); // Convierte la fecha de string a Date
    const today = new Date(); // Fecha actual

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Ajusta la edad si el cumpleaños aún no ha ocurrido este año
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
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
            onPress={handleGenerateRecipePDF}
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
