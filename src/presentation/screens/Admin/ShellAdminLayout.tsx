import { Button, Divider } from "@nextui-org/react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { listItemSidebar } from "../../../const/sidebar.const";
import { LogOutButton } from "../../components/Buttons/LogOutButton";
import { Me } from "../../components/Me";
import { Suspense } from "react";
import { LoadingScreen } from "../LoadingScreen";
import { AccordionInput } from "./components/AccordionInput";
import { IoMenu, IoSettings } from "react-icons/io5";
import { useNavBarStorage } from "../../storage/navbar.storage";
import { NavBar } from "../../components/NavBar";

export function ShellAdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const toggleNavbar = useNavBarStorage((state) => state.toggleNavBar);

  return (
    <>
      <div className="w-full h-screen flex flex-row">
        {/* sidebar */}
        <div className="w-1/5 min-w-[230px] hidden md:flex md:flex-col md:justify-between h-full bg-gray-100 px-4">
          {/* header */}
          <div className="h-14 flex flex-row items-center">
            {/* <ShopDetail /> */}
          </div>
          <Divider className="mb-3" />

          <div className="flex flex-col gap-3">
            {listItemSidebar.map((item) => {
              if (item.children) {
                const isActive = (item.children ?? []).some((e) =>
                  location.pathname.includes(e.key)
                );
                return (
                  <AccordionInput
                    parentPath={item.path}
                    key={item.key}
                    icon={item.icon}
                    isActive={isActive}
                    name={item.name}
                    children={item.children}
                  />
                );
              }

              const isActive = location.pathname.includes(item.key);

              return (
                <Button
                  key={item.key}
                  startContent={
                    <div className='text-small ${isActive ? "bg-gray-300" : ""}0'>
                      {item.icon}
                    </div>
                  }
                  color={isActive ? "primary" : "default"}
                  variant={isActive ? "solid" : "flat"}
                  radius="sm"
                  size="md"
                  fullWidth
                  className='flex justify-start ${isActive ? "bg-gray-300" : ""}'
                  onClick={() => {
                    if (!isActive) navigate(item.path!);
                  }}
                >
                  {item.name}
                </Button>
              );
            })}
          </div>

          <div className="flex-grow"></div>

          <div className="mb-5 flex flex-col gap-2">
            <Button
              onClick={() => navigate("/settings")}
              variant="light"
              color="primary"
              className="justify-start"
              startContent={<IoSettings />}
            >
              Configuraciónes
            </Button>
            <LogOutButton />
          </div>
        </div>
        {/* home */}
        <div className="flex-1 flex flex-col">
          <div className="w-full h-14 flex items-center justify-between sm:justify-end px-4">
            <Button
              onClick={() => toggleNavbar()}
              isIconOnly
              variant="flat"
              className="sm:hidden mr-2 flex items-center justify-center"
            >
              <IoMenu />
            </Button>
            <Me />
          </div>
          <Divider className="ml-1 w-[99%]" />
          <div className="flex-1 overflow-auto">
            <Suspense fallback={<LoadingScreen message="Cargando Modulo" />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </div>
      <NavBar />
    </>
  );
}
