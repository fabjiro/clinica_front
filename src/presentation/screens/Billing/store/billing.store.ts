import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SearchProductEntity } from "../../../../domain/entity/product/searchProduct.entity";

interface IBillingProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  subTotal: number;
  quantity: number;
  stock: number;
}

interface IBillingStore {
  products: IBillingProduct[];
  addProduct: (product: SearchProductEntity) => void;
  removeProduct: (id: string) => void;
  updateCounter: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useBillingStore = create(
  persist<IBillingStore>(
    (set, get) => ({
      products: [],
      total: 0,
      addProduct: (product: SearchProductEntity) => {
        set((state) => {
          if (state.products.find((item) => item.id === product.id)) {
            return {
              products: state.products.map((item) => {
                if (item.id === product.id) {
                  return {
                    ...item,
                    subTotal: item.subTotal + product.price,
                    quantity: item.quantity + 1,
                  };
                }
                return item;
              }),
              total: state.total + product.price,
            };
          }

          return {
            products: [
              ...state.products,
              {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image.originalUrl,
                subTotal: product.price,
                quantity: 1,
                stock: product.stock,
              },
            ],
            total: state.total + product.price,
          };
        });
      },
      updateCounter: (id: string, quantity: number) => {
        const product = get().products.find((item) => item.id === id);

        if(!product) return;

        set((state) => ({
          products: state.products.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                quantity,
                subTotal: item.price * quantity,
              };
            }
            return item;
          }),
          total: state.total - (product.price * product.quantity) + (product.price * quantity),
        }));
      },
      removeProduct: (id: string) => {
        const product = get().products.find((item) => item.id === id);

        if(!product) return;

        set((state) => ({
          products: state.products.filter((item) => item.id !== product.id),
          total: state.total - (product.price * product.quantity),
        }));
      },
      clearCart: () => {
        set(() => ({
          products: [],
          total: 0,
        }));
      },
    }),
    {
      name: "billing",
    }
  )
);
