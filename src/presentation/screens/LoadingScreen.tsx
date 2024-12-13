import { CircularProgress } from "@nextui-org/react";

interface IProps {
  message?: string;
}
export function LoadingScreen({ message }: IProps) {
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
      <CircularProgress aria-label="Cargando..." />
      {message && <p>{message}</p>}
    </div>
  );
}
