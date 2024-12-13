import { create } from "zustand";
import { MODEFORMENUM } from "../../../../enum/mode/mode.enum";

interface IInventoryStore {
  showForm: boolean;
  toggleForm: () => void;
  modeForm: MODEFORMENUM;
  setModeForm: (mode: MODEFORMENUM) => void;
  titleForm?: string;
  setShowForm: (value: boolean) => void;
}

export const useInventoryStore = create<IInventoryStore>((set) => ({
  showForm: false,
  toggleForm: () => set((state) => ({ showForm: !state.showForm })),
  modeForm: MODEFORMENUM.CREATE,
  setModeForm: (mode) => {
    const newTitle =
      mode === MODEFORMENUM.CREATE
        ? "Nueva entrada de inventario"
        : "Ajuste de inventario";
    set({ modeForm: mode, titleForm: newTitle });
  },
  titleForm: "",
  setShowForm: (value) => set({ showForm: value }),
}));
