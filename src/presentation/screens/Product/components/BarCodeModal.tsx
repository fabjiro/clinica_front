import { Button } from "@nextui-org/react";
import { BsDownload, BsFillPrinterFill } from "react-icons/bs";
import { BaseModal } from "../../../components/Base/BaseModal";
import { useProductStore } from "../store/product.store";
import { useRef, useEffect } from "react";
import { useToggle } from "../../../hooks/useToggle";
import JsBarcode from "jsbarcode";

export function BarCodeModal() {
  const { showDialogBarCode, toggleDialogBarCode, product } = useProductStore();
  const [isLoading, toggleIsloading] = useToggle();
  const printRef = useRef<HTMLDivElement>(null);
  const barcodeRef = useRef<SVGSVGElement>(null); // Referencia para el SVG del código de barras

  useEffect(() => {
    if (product && barcodeRef.current) {
      JsBarcode(barcodeRef.current, product.id, {
        displayValue: false,
      });
    }
  }, [product, showDialogBarCode]);

  const handlePrint = async () => {
    if (!barcodeRef.current || !product) return;
  
    toggleIsloading();
  
    // Extraer el contenido SVG del Barcode generado por jsbarcode
    const svgElement = barcodeRef.current;
    const svgString = new XMLSerializer().serializeToString(svgElement);
  
    // Crear un objeto de imagen a partir del contenido SVG
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
    const svgUrl = URL.createObjectURL(svgBlob);
  
    img.onload = () => {
      // Crear un canvas para dibujar el contenido de la imagen SVG
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Ajustar el tamaño del canvas a la imagen SVG
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
  
        // Convertir el canvas a imagen PNG
        const imgUrl = canvas.toDataURL("image/png");
  
        // Crear nueva ventana para imprimir
        const newWindow = window.open("", "_blank");
        if (!newWindow) return;
  
        // Esperar a que la imagen se haya cargado completamente antes de la impresión
        const image = new Image();
        image.src = imgUrl;
  
        // Esperar que la imagen se haya cargado
        image.onload = () => {
          const style = `
            height: auto;
            width: 80%;  // Ajusta el ancho
            max-width: 800px;  // Limita el ancho máximo
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            z-index: 9999;
          `;
          newWindow.document.write(`
            <html>
              <head>
                <title>Impresión del código de barras</title>
              </head>
              <body style="margin:0;" onload="window.print(); window.close();">
                <img src="${imgUrl}" style="${style}" />
              </body>
            </html>
          `);
          newWindow.document.close();
        };
        
        // En caso de error en la carga de la imagen
        image.onerror = () => {
          console.error("Error al cargar la imagen para imprimir.");
        };
      }
    };
  
    img.src = svgUrl;
  
    toggleIsloading();
  };
  

  const handleDownload = async () => {
    if (!barcodeRef.current || !product) return;

    toggleIsloading();

    // Extraer el contenido SVG del Barcode generado por jsbarcode
    const svgElement = barcodeRef.current;
    const svgString = new XMLSerializer().serializeToString(svgElement);

    // Crear un objeto de imagen a partir del contenido SVG
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
      // Crear un canvas para dibujar el contenido de la imagen SVG
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Ajustar el tamaño del canvas a la imagen SVG
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        // Convertir el canvas a imagen PNG
        const imgUrl = canvas.toDataURL("image/png");
        
        // Crear un enlace para la descarga
        const link = document.createElement("a");
        link.href = imgUrl;
        link.download = `codigo-de-barras-${product.id}.png`; // Nombre del archivo de descarga
        link.click(); // Simular el clic en el enlace para iniciar la descarga
      }
    };
    img.src = svgUrl;

    toggleIsloading();
  };

  return (
    <BaseModal
      title="Código de barras"
      isOpen={showDialogBarCode}
      onOpenChange={toggleDialogBarCode}
    >
      <div className="flex flex-col gap-1">
        {/* Contenido a capturar */}
        <div ref={printRef} className="[&>*]:w-full">
          <p className="text-medium">Producto: {product?.name}</p>
          {/* Elemento donde se generará el código de barras */}
          <svg ref={barcodeRef}></svg>
        </div>
        {/* Botón para imprimir */}
        <div className="flex flex-row gap-2 items-center justify-end">
          <Button
            disabled={isLoading}
            onClick={handleDownload}
            startContent={<BsDownload />}
          >
            Descargar
          </Button>
          <Button
            disabled={isLoading}
            onClick={handlePrint}
            startContent={<BsFillPrinterFill />}
          >
            Imprimir
          </Button>
        </div>
      </div>
    </BaseModal>
  );
}
