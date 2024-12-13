import { Image } from "@nextui-org/react";

interface IProps {
  name: string;
  url: string;
}
export function ProductTitleAndImage({ name, url }: IProps) {


  return (
    <div className="flex flex-row gap-2 h-full items-center">
      <Image
        isBlurred
        src={url}
        className="rounded-md w-full h-10 object-contain aspect-square"
      />
      <p className="w-[50%] text-ellipsis">{name}</p>
    </div>
  );
}
