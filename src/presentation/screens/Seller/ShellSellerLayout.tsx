import { Outlet } from "react-router-dom";
import { Me } from "../../components/Me";
import { Divider } from "@nextui-org/react";

export function ShellSellerLayout() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-10/12 h-full flex flex-col gap-2">
        <div className="px-6 h-16 w-full flex flex-row items-center justify-between">
          {/* <ShopDetail/> */}
          <Me />
        </div>
        <Divider/>
        <div className="flex-1 w-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
