import { Suspense } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LoadingScreen } from "../LoadingScreen";
import { Button, Divider, Tooltip } from "@nextui-org/react";
import { AccordionInput } from "../Admin/components/AccordionInput";
import { ListItemSetting } from "../../../const/setting.const";
import { Me } from "../../components/Me";
import { IoMdArrowRoundBack } from "react-icons/io";

export function ShellSettingLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-10/12 h-full flex flex-row">
        {/* sidebar */}
        <div className="w-1/6 min-w-[250px] flex flex-col h-full px-4">
          <div className="flex flex-row gap-2 items-center">
            <Tooltip content="Atras" showArrow>
              <Button onClick={() => navigate("/")} size="sm" isIconOnly>
                <IoMdArrowRoundBack />
              </Button>
            </Tooltip>
            <h1 className="h-14 flex flex-col justify-center font-semibold text-lg">
              Configuraciones
            </h1>
          </div>
          <Divider />
          <div className="flex flex-col gap-3 py-6">
            {ListItemSetting.map((item) => {
              if (item.children) {
                const isActive = (item.children ?? []).some((e) =>
                  location.pathname.includes(e.key)
                );
                return (
                  <AccordionInput
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
                    if (!isActive) navigate("/settings" + item.path!);
                  }}
                >
                  {item.name}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <div className="w-full h-14 flex items-center justify-end px-4">
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
    </div>
  );
}
