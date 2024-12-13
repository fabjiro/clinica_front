import { create } from "zustand";
import { CategoryEntity } from "../../../../domain/entity/category/category.entity";
import { MODEFORMENUM } from "../../../../enum/mode/mode.enum";

interface ICategoryStore {
  modeForm: MODEFORMENUM;
  titleForm?: string;
  showForm: boolean;
  toggleForm: () => void;
  setModeForm: (mode: MODEFORMENUM) => void;
  setCategory: (category: CategoryEntity) => void;
  category?: CategoryEntity;
}

export const useCategoryStore = create<ICategoryStore>()((set, get) => ({
  modeForm: MODEFORMENUM.CREATE,
  showForm: false,
  toggleForm: () => set({ showForm: !get().showForm }),
  setModeForm: (mode: MODEFORMENUM) => {
    set({
      modeForm: mode,
      titleForm:
        mode === MODEFORMENUM.CREATE ? "Nueva categoria" : "Editar categoria",
    });
  },
  setCategory: (category: CategoryEntity) => set({ category }),
  category: undefined,
}));