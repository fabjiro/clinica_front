import { FaBox } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { ISidebarItem } from "../interfaces/sidebar.interfaces";
import { MdBackup, MdDashboard, MdHistory, MdInventory } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { PiCashRegisterFill } from "react-icons/pi";

export const listItemSidebar: ISidebarItem[] = [
  {
    name: "Dashboard",
    key: "dashboard",
    path: "/dashboard",
    icon: <MdDashboard />,
  },
  {
    name: "Facturación",
    key: "billing",
    path: "/billing",
    icon: <PiCashRegisterFill />,
  },
  {
    name: "Inventario",
    key: "inventory",
    icon: <MdInventory />,
    path: "/inventory",
    children: [
      {
        name: "Categorias",
        key: "category",
        path: "/category",
        icon: <BiSolidCategoryAlt />,
      },
      {
        name: "Productos",
        key: "product",
        path: "/product",
        icon: <FaBox />,
      },
      {
        name: "Historial",
        key: "history",
        path: "/history",
        icon: <MdHistory />,
      },
    ],
  },
  {
    name: "Usuarios",
    key: "users",
    path: "/users",
    icon: <FaUsersGear />,
  },

  {
    name: "Reportes",
    key: "reports",
    path: "/reports",
    icon: <IoDocumentText />,
  },
  {
    name: "Copias de seguridad",
    key: "backups",
    path: "/backups",
    icon: <MdBackup />,
  },
];
