import { useNavigate, useParams } from "react-router-dom";
import { BaseScreen } from "../BaseScreen";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, Input, User } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { IPatient } from "../../../interfaces/patient.interface";
import { useQueryClient } from "@tanstack/react-query";
import { useGetConsultByPatientId } from "../Files/query/consult.query";
import { useEffect, useMemo } from "react";
import moment from "moment/min/moment-with-locales";
import { ActionConsult } from "./components/ActionConsult";
import { useState } from "react";
import { MODEFORMENUM } from "../../../enum/mode/mode.enum";
import { BaseModal } from "../../components/Base/BaseModal";
import { FormConsult } from "../Files/components/FormConsult";
import { useConsutlFormStore } from "../../storage/form.storage";
import { VscFileSymlinkDirectory } from "react-icons/vsc";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";
import { useGetAllUsers } from "../Users/query/user.query";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";

import img from "../Customer/receta medica.jpg";

const columns: GridColDef[] = [
  { field: "colId", headerName: "N.", width: 90 },
  {
    field: "col1",
    headerName: "Motivo",
    flex: 1,
  },
  {
    field: "col2",
    headerName: "Registrado por",
    flex: 1,
    renderCell: (params) => (
      <div className="flex items-center justify-start w-full h-full">
        <User
          name={params.row.col2.name}
          avatarProps={{
            src: params.row.col2.url,
          }}
        />
      </div>
    ),
  },
  {
    field: "col8",
    headerName: "Fecha de creación",
    flex: 1,
  },
  {
    field: "col7",
    headerName: "Acciones",
    width: 100,
    sortable: false,
    filterable: false,
    pinnable: false,
    renderCell: (params) => <ActionConsult id={params.id.toString()} />,
  },
];
export function ConsultScreen() {
  const { patientId } = useParams();
  const navigate = useNavigate();
  const clientQuery = useQueryClient();
  const [searchByWord, setSearchByWord] = useState<string | undefined>();

  if (!patientId) {
    navigate("/");
    return null;
  }

  const {
    modeForm,
    toggleForm: toggleFormConsult,
    showForm,
  } = useConsutlFormStore();

  const patient = (
    clientQuery.getQueryData<IPatient[]>(["getAllPatient"]) ?? []
  ).find((patient) => patient.id === patientId);

  const { data: consultData, isFetching: isLoadingConsult } =
    useGetConsultByPatientId(patientId);

  const rows = useMemo(() => {
    if (!consultData) {
      return [];
    }

    if (searchByWord) {
      return consultData
        .filter((consult) =>
          consult.motive.toLowerCase().includes(searchByWord.toLowerCase())
        )
        .map((consult, index) => ({
          colId: index + 1,
          id: consult.id,
          col1: consult.motive,
          col2: {
            name: consult.userCreatedBy.name,
            url: consult.userCreatedBy.avatar?.compactUrl,
          },
          col8: moment(consult.createdAt).locale("es").format("L"),
        }));
    }

    return consultData.map((consult, index) => ({
      colId: index + 1,
      id: consult.id,
      col1: consult.motive,
      col2: {
        name: consult.userCreatedBy.name,
        url: consult.userCreatedBy.avatar?.compactUrl,
      },
      col8: moment(consult.createdAt).locale("es").format("L"),
    }));
  }, [consultData, searchByWord]);

  console.log(consultData);

  function generateConsultationPDF(consultations: any[]) {
    const doc = new jsPDF();

    console.log(consultations[0].patient.name);

    autoTable(doc, {
      body: [
        [
          {
            content: "Ficha del Paciente",
            styles: {
              fontStyle: "bold",
              fontSize: 30,
              fillColor: [0, 76, 153],
              lineColor: [0, 0, 0],
              textColor: [255, 255, 255],
              halign: "center",
            },
            colSpan: 3,
          },
        ],
        [
          {
            content: "Nombre del paciente:",
            styles: {
              fontStyle: "bold",
              fontSize: 15,
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
          },
          {
            content: "Fecha de creación:",
            styles: {
              fontStyle: "bold",
              fontSize: 15,
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
          },
          {
            content: "Identificación:",
            styles: {
              fontStyle: "bold",
              fontSize: 15,
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
          },
        ],
        [
          {
            content: consultations[0].patient?.name || "N/A",
            styles: {
              lineColor: [0, 0, 0],
              fontSize: 15,
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
          {
            content:
              new Date(
                consultations[0].patient?.createdAt
              ).toLocaleDateString() || "N/A",
            styles: {
              lineColor: [0, 0, 0],
              fontSize: 15,
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
          {
            content: consultations[0].patient?.identification || "N/A",
            styles: {
              lineColor: [0, 0, 0],
              fontSize: 15,
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
        ],
        [
          {
            content: "Teléfono:",
            styles: {
              fontStyle: "bold",
              fontSize: 15,
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
          },
          {
            content: "Edad:",
            styles: {
              fontStyle: "bold",
              fontSize: 15,
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
          },
          {
            content: "Dirección:",
            styles: {
              fontStyle: "bold",
              fontSize: 15,
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
          },
        ],
        [
          {
            content: consultations[0].patient?.phone || "N/A",
            styles: {
              lineColor: [0, 0, 0],
              fontSize: 15,
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
          {
            content: consultations[0].patient?.age || "N/A",
            styles: {
              lineColor: [0, 0, 0],
              fontSize: 15,
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
          {
            content: consultations[0].patient?.address || "N/A",
            styles: {
              lineColor: [0, 0, 0],
              fontSize: 15,
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
        ],
        [
          {
            content: "Fecha de Nacimiento:",
            styles: {
              fontStyle: "bold",
              fontSize: 15,
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
          },
          {
            content: "Sexo:",
            styles: {
              fontStyle: "bold",
              fontSize: 15,
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
          },
          {
            content: "Estado Civil:",
            styles: {
              fontStyle: "bold",
              fontSize: 15,
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
          },
        ],
        [
          {
            content:
              new Date(
                consultations[0].patient?.birthday
              ).toLocaleDateString() || "N/A",
            styles: {
              lineColor: [0, 0, 0],
              fontSize: 15,
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
          {
            content:
              consultations[0].patient?.typeSex ===
              "c2594acf-bb7c-49d0-9506-f556179670ab"
                ? "Femenino"
                : "Masculino",
            styles: {
              lineColor: [0, 0, 0],
              fontSize: 15,
              halign: "center",
              textColor: [0, 0, 0],
            },
          },

          {
            content: consultations[0].patient?.civilStatus?.name || "N/A",
            styles: {
              lineColor: [0, 0, 0],
              fontSize: 15,
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
        ],
        [
          {
            content: "Persona de Contacto:",
            styles: {
              fontStyle: "bold",
              fontSize: 15,
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
          },
          {
            content: "Teléfono de Contacto:",
            styles: {
              fontStyle: "bold",
              fontSize: 15,
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
          },
          {
            content: "Número de Consultas:",
            styles: {
              fontStyle: "bold",
              fontSize: 15,
              fillColor: [200, 200, 200],
              lineColor: [0, 0, 0],
              textColor: [0, 0, 0],
            },
          },
        ],
        [
          {
            content: consultations[0].patient?.contactPerson || "N/A",
            styles: {
              lineColor: [0, 0, 0],
              fontSize: 15,
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
          {
            content: consultations[0].patient?.contactPhone || "N/A",
            styles: {
              lineColor: [0, 0, 0],
              fontSize: 15,
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
          {
            content: consultations[0].patient?.consultCount || "N/A",
            styles: {
              lineColor: [0, 0, 0],
              fontSize: 15,
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
        ],
      ],
      theme: "grid",
      styles: {
        font: "helvetica", // Puedes ajustar el tipo de fuente si lo necesitas

        cellPadding: 2, // Espaciado dentro de las celdas
      },
      margin: { top: 60, left: 5, right: 5 }, // Márgenes para centrar la tabla en la página
      tableWidth: "auto", // Esto asegura que la tabla se ajuste bien al tamaño de la página
    });

    doc.addPage();

    consultations.forEach((consult, index) => {
      if (index > 0) doc.addPage(); // Añadir una nueva página para cada consulta

      // doc.addImage(
      //   "https://dl.dropboxusercontent.com/scl/fi/1dkv94n2vwvnjmpd03yj8/e2ed39fa-ed26-44c4-955d-11ce1231afc8.jpeg?rlkey=syzmyq0gi6fbc90oy5ttrx2qt&dl=0",
      //   "JPEG",
      //   10,
      //   10,
      //   10,
      //   10
      // );

      // doc.setFontSize(6);
      // doc.text("Hola", 20, 15);
      // doc.text("Adios", 20, 20);
      // doc.text("xdxdxdxd", 20, 25);

      let currentY = 30;

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
              content:
                new Date(consult.createdAt).toLocaleDateString() || "N/A",
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

      //encabezado de pagina
      // doc.addImage(
      //   "https://dl.dropboxusercontent.com/scl/fi/1dkv94n2vwvnjmpd03yj8/e2ed39fa-ed26-44c4-955d-11ce1231afc8.jpeg?rlkey=syzmyq0gi6fbc90oy5ttrx2qt&dl=0",
      //   "JPEG",
      //   10,
      //   10,
      //   10,
      //   10
      // );
      //pagina de imagen examen complementario
      if (consult.image) {
        if (consult.image.originalUrl) {
          doc.addPage();
          doc.addImage(consult.image.originalUrl, 10, 30, 190, 150);
        }
      }

      //receta medica
      doc.addPage();
      // Cargar la imagen (en este caso, la imagen se carga desde una URL)
      const imgPath = img; // Cambia esto por la ruta de tu imagen

      // Agregar la imagen al PDF como fondo (ajustar al tamaño de la página)
      doc.addImage(
        imgPath,
        "JPEG",
        0,
        0,
        doc.internal.pageSize.width,
        doc.internal.pageSize.height
      );

      // Ahora puedes agregar más contenido encima de la imagen, por ejemplo, texto:
      doc.setFontSize(16);
      doc.text(consult.patient?.name || "N/A", 60, 60);
      doc.text(consult.createdAt.split("T")[0] || "N/A", 155, 60);
      doc.text(
        calculateAge(consult.patient?.birthday || "N/A").toString(),
        40,
        72
      );
      doc.text(
        consult.patient?.typeSex === "c2594acf-bb7c-49d0-9506-f556179670ab"
          ? "Masculino"
          : "Femeninio",
        94,
        72
      );
      doc.text(consult.weight ? `${consult.weight} kg` : "N/A", 160, 72);
      doc.text(consult.diagnosis || "N/A", 50, 84);
      doc.text(consult.recipe || "N/A", 20, 110);
      doc.text(consult.userCreatedBy?.name || "N/A", 140, 270);
      doc.text(consult.nextappointment || "N/A", 22, 257);

      // doc.setFontSize(6);
      // doc.text("Hola", 20, 15);
      // doc.text("Adios", 20, 20);
      // doc.text("xdxdxdxd", 20, 25);

      //imagen examen complementario
    });

    // Guardar el PDF con el nombre del paciente o un nombre genérico si es null
    const fileName = patient?.name
      ? `Consulta_Medica_${patient?.name}.pdf`
      : "Consulta_Medica.pdf";

    // Guardar el archivo
    doc.save(fileName);
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

  return (
    <>
      <BaseScreen
        isLoading={isLoadingConsult}
        showBackButton
        titlePage={`Consultas de ${patient?.name}`}
        actions={
          <>
            <Button
              onClick={() => generateConsultationPDF(consultData || [])}
              startContent={<VscFileSymlinkDirectory />}
              color="primary"
            >
              Exportar Expediente
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-2 flex-1">
          <Input
            label=""
            placeholder="Buscar consulta..."
            variant="bordered"
            startContent={<CiSearch />}
            className="max-w-sm"
            onChange={(e) => setSearchByWord(e.target.value)}
          />
          <div className="flex-1 overflow-auto">
            <DataGrid columns={columns} rows={rows} disableColumnMenu />
          </div>
        </div>
      </BaseScreen>
      <BaseModal
        size="full"
        scrollBehavior="inside"
        isOpen={showForm}
        onOpenChange={toggleFormConsult}
        title={
          modeForm === MODEFORMENUM.CREATE
            ? "Nueva Consulta"
            : "Editar Consulta"
        }
      >
        <FormConsult />
      </BaseModal>
    </>
  );
}
//xdxd
