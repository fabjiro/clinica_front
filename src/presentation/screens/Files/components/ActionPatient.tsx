import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { FaEllipsisVertical, FaEye, FaIdCard } from "react-icons/fa6";
import { MdEdit, MdDelete } from "react-icons/md";
import { usePatientStore } from "../store/patient.store";
import { MODEFORMENUM } from "../../../../enum/mode/mode.enum";
import { useQueryClient } from "@tanstack/react-query";
import { IPatient } from "../../../../interfaces/patient.interface";
import { useConfirmStore } from "../../../storage/confim.storage";
import { useDeletePatient } from "../query/patient.query";
import { IoIosDocument } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { VscFileSymlinkDirectory } from "react-icons/vsc";
import { IConsult } from "../../../../interfaces/consult.interface";
import { useGetConsultByPatientId } from "../query/consult.query";
import { SiFiles } from "react-icons/si";

interface IProps {
  id: string;
}

export function ActionPatient({ id }: IProps) {
  const { toggleForm, setModeForm, setPatient } = usePatientStore();
  const { status: statusDeletePatient, mutate: handleDeletePatient } =
    useDeletePatient();
  const clientQuery = useQueryClient();
  const showConfirm = useConfirmStore((state) => state.showConfirm);
  const navigate = useNavigate();

  const handleUpdate = () => {
    const patient = (
      clientQuery.getQueryData<IPatient[]>(["getAllPatient"]) ?? []
    ).find((patient) => patient.id === id);

    if (!patient) return;

    setPatient(patient);
    setModeForm(MODEFORMENUM.UPDATE);
    toggleForm();
  };

  const handleDelete = () => {
    showConfirm("Eliminar", "¿Desea eliminar el paciente?", () => {
      handleDeletePatient(id);
    });
  };

  const handleGenerateFicha = () => {
    const patient = (
      clientQuery.getQueryData<IPatient[]>(["getAllPatient"]) ?? []
    ).find((patient) => patient.id === id);

    if (!patient) {
      alert("No se encontró el paciente.");
      return;
    }

    console.log("patient Data:", patient);

    const doc = new jsPDF("landscape");

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
            content: patient?.name || "N/A",
            styles: {
              lineColor: [0, 0, 0],
              fontSize: 15,
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
          {
            content: new Date(patient?.createdAt).toLocaleDateString() || "N/A",
            styles: {
              lineColor: [0, 0, 0],
              fontSize: 15,
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
          {
            content: patient?.identification || "N/A",
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
            content: patient?.phone || "N/A",
            styles: {
              lineColor: [0, 0, 0],
              fontSize: 15,
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
          {
            content: patient?.age || "N/A",
            styles: {
              lineColor: [0, 0, 0],
              fontSize: 15,
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
          {
            content: patient?.address || "N/A",
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
            content: new Date(patient?.birthday).toLocaleDateString() || "N/A",
            styles: {
              lineColor: [0, 0, 0],
              fontSize: 15,
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
          {
            content:
              patient?.typeSex === "c2594acf-bb7c-49d0-9506-f556179670ab"
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
            content: patient?.civilStatus?.name || "N/A",
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
            content: patient?.contactPerson || "N/A",
            styles: {
              lineColor: [0, 0, 0],
              fontSize: 15,
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
          {
            content: patient?.contactPhone || "N/A",
            styles: {
              lineColor: [0, 0, 0],
              fontSize: 15,
              halign: "center",
              textColor: [0, 0, 0],
            },
          },
          {
            content: patient?.consultCount || "N/A",
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

        cellPadding: 4, // Espaciado dentro de las celdas
      },
      margin: { top: 30, left: 20, right: 20 }, // Márgenes para centrar la tabla en la página
      tableWidth: "auto", // Esto asegura que la tabla se ajuste bien al tamaño de la página
    });

    const fileName = patient?.name
      ? `Ficha_del_Paciente_${patient.name}.pdf`
      : "Ficha_del_Paciente_.pdf";

    doc.save(fileName);
  };

  return (
    <div className="flex flex-row gap-2 items-center justify-center h-full w-full">
      <Dropdown backdrop="blur" className="rounded-md">
        <DropdownTrigger>
          <Button
            isLoading={statusDeletePatient === "pending"}
            size="sm"
            isIconOnly
            variant="light"
          >
            <FaEllipsisVertical />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem
            showDivider
            startContent={<FaIdCard />}
            key="edit"
            onClick={handleGenerateFicha}
          >
            Generar Ficha del Paciente
          </DropdownItem>
          <DropdownItem
            startContent={<SiFiles />}
            key="consult"
            onClick={() => navigate("/files/patient/" + id)}
          >
            Ver Expediente
          </DropdownItem>
          <DropdownItem
            showDivider
            startContent={<MdEdit />}
            key="edit"
            onClick={handleUpdate}
          >
            Editar
          </DropdownItem>
          <DropdownItem
            className="text-danger"
            color="danger"
            key="edit"
            startContent={<MdDelete />}
            onClick={handleDelete}
          >
            Eliminar
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
