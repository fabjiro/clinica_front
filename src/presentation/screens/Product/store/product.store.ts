import { create } from "zustand";
import { ProductEntity } from "../../../../domain/entity/product/product.entity";
import { MODEFORMENUM } from "../../../../enum/mode/mode.enum";

interface IProductStore {
  modeForm: MODEFORMENUM;
  titleForm?: string;
  showForm: boolean;
  toggleForm: () => void;
  setModeForm: (mode: MODEFORMENUM) => void;
  setProduct: (product: ProductEntity) => void;
  product?: ProductEntity;
  showDialogBarCode: boolean;
  toggleDialogBarCode: () => void;
}

export const useProductStore = create<IProductStore>()((set, get) => ({
  modeForm: MODEFORMENUM.CREATE,
  showForm: false,
  showDialogBarCode: false,
  toggleForm: () => set({ showForm: !get().showForm }),
  toggleDialogBarCode: () => set({ showDialogBarCode: !get().showDialogBarCode }),
  setModeForm: (mode: MODEFORMENUM) => {
    set({
      modeForm: mode,
      titleForm:
        mode === MODEFORMENUM.CREATE ? "Nuevo producto" : "Editar producto",
    });
  },
  setProduct: (product: ProductEntity) => set({ product }),
  product: undefined,
}));
