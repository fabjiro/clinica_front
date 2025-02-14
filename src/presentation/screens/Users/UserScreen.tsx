import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button } from "@nextui-org/react";
import { useGetAllUsers } from "./query/user.query";
import { useEffect, useMemo } from "react";
import { AvatarAndNameUser } from "./components/AvatarAndNameUser";
import { UserAction } from "./components/UserAction";
import { BaseModal } from "../../components/Base/BaseModal";
import { FormUser } from "./components/FormUser";
import { BaseScreen } from "../BaseScreen";
import { useUserStore } from "./store/user.store";
import { MODEFORMENUM } from "../../../enum/mode/mode.enum";
import { RefreshButton } from "../../components/Buttons/RefreshButton";
import { ConstData } from "../../../const/const";

const columns: GridColDef[] = [
  {
    field: "col1",
    renderCell: (params) => (
      <AvatarAndNameUser name={params.value.name} url={params.value.url} />
    ),
    headerName: "Nombre",
    flex: 1,
  },
  { field: "col2", headerName: "Correo", flex: 1 },
  { field: "col3", headerName: "Rol", flex: 1 },
  {
    field: "col5",
    headerName: "Acciones",
    width: 100,
    sortable: false,
    filterable: false,
    pinnable: false,
    renderCell: (params) => <UserAction id={params.id.toString()} />,
  },
];

export default function UserScreen() {
  const {
    data: usersData,
    status: statusGetUsers,
    refetch: refetchUsers,
    isRefetching: isRefetchingUsers,
  } = useGetAllUsers();

  const { titleForm, toggleForm, showForm, setModeForm } = useUserStore();

  const rows = useMemo(() => {
    if (!usersData) {
      return [];
    }

    return usersData.map((user) => ({
      id: user.id,
      col1: {
        name: user.name,
        url: user.avatar?.compactUrl,
      },
      col2: user.email,
      col3: user.rol?.name,
    }));
  }, [usersData]);

  console.log(usersData);

  useEffect(() => {
    console.log(statusGetUsers);
  }, [statusGetUsers]);

  const isLoadingUsers = statusGetUsers === "pending" || isRefetchingUsers;

  return (
    <BaseScreen
      titlePage="Usuarios"
      actions={
        <>
          <Button
            color="primary"
            onClick={() => {
              setModeForm(MODEFORMENUM.CREATE);
              toggleForm();
            }}
          >
            Nuevo usuario
          </Button>
          {ConstData.HasElectronMode && (
            <RefreshButton onClick={() => refetchUsers()} />
          )}
        </>
      }
    >
      <>
        <div className="flex-1">
          <DataGrid
            loading={isLoadingUsers}
            disableColumnMenu
            hideFooter
            rows={rows}
            columns={columns}
          />
        </div>
        <BaseModal
          title={titleForm}
          onOpenChange={toggleForm}
          isOpen={showForm}
        >
          <FormUser />
        </BaseModal>
      </>
    </BaseScreen>
  );
}
