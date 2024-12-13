import { Button, Tooltip } from "@nextui-org/react";
import { BaseConfirmModal } from "../components/Base/BaseConfirmModal";
import { useConfirmStore } from "../storage/confim.storage";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

interface IProps {
  children?: JSX.Element;
  titlePage?: string;
  actions?: JSX.Element;
  showBackButton?: boolean;
}
export function BaseScreen({
  children,
  titlePage,
  actions,
  showBackButton = false,
}: IProps) {
  const { title, description, isOpen, hideConfirm, confirm } =
    useConfirmStore();

  const navigate = useNavigate();

  return (
    <>
      <div className="w-full h-full flex flex-col gap-4 px-4 py-2 ">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-2">
            {showBackButton && (
              <Tooltip content="Atras" showArrow>
                <Button
                  onClick={() => navigate(-1)}
                  size="sm"
                  startContent={<IoMdArrowRoundBack />}
                />
              </Tooltip>
            )}
            <h1 className="text-2xl font-semibold">{titlePage}</h1>
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            {actions}
          </div>
        </div>
        {children}
      </div>
      <BaseConfirmModal
        title={title}
        description={description}
        isOpen={isOpen}
        onOpenChange={hideConfirm}
        onCancel={hideConfirm}
        onConfirm={confirm}
      />
    </>
  );
}
