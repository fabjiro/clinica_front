import { Input } from "@nextui-org/react";
import React, { useRef } from "react";
// import { useReactToPrint } from "react-to-print";
import { BaseModal } from "../../../components/Base/BaseModal";

interface IProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}
export function ModalFacturationDetail({ isOpen, onOpenChange }: IProps) {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {}

  const shopName = "Mi Tienda";
  const products: Product[] = [
    { name: "Producto 1", quantity: 2, price: 10.0 },
    { name: "Producto 2", quantity: 1, price: 20.0 },
    { name: "Producto 3", quantity: 3, price: 5.0 },
  ];

  return (
    <BaseModal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Detalles de la factura"
    >
      <div className="w-full h-full bg-red-50 flex flex-col gap-2">
        <Input placeholder="Nombre del cliente" labelPlacement="outside" />

        <div>
          <button onClick={() => handlePrint()}>Imprimir Factura</button>
          <Invoice ref={componentRef} shopName={shopName} products={products} />
        </div>
      </div>
    </BaseModal>
  );
}

// Definición de tipos
type Product = {
  name: string;
  quantity: number;
  price: number;
};

type InvoiceProps = {
  shopName: string;
  products: Product[];
};

// Componente de factura
const Invoice = React.forwardRef<HTMLDivElement, InvoiceProps>(
  ({ shopName, products }, ref) => {
    const total = products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return (
      <div ref={ref} style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1>{shopName}</h1>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "5px" }}>
                Producto
              </th>
              <th style={{ border: "1px solid black", padding: "5px" }}>
                Cantidad
              </th>
              <th style={{ border: "1px solid black", padding: "5px" }}>
                Precio
              </th>
              <th style={{ border: "1px solid black", padding: "5px" }}>
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid black", padding: "5px" }}>
                  {product.name}
                </td>
                <td style={{ border: "1px solid black", padding: "5px" }}>
                  {product.quantity}
                </td>
                <td style={{ border: "1px solid black", padding: "5px" }}>
                  ${product.price.toFixed(2)}
                </td>
                <td style={{ border: "1px solid black", padding: "5px" }}>
                  ${(product.quantity * product.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Total: ${total.toFixed(2)}</h2>
      </div>
    );
  }
);

Invoice.displayName = "Invoice";
