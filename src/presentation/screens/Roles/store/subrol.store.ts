import { create } from "zustand";
import { MODEFORMENUM } from "../../../../enum/mode/mode.enum";

// import { IExam } from "../../../../interfaces/exam.interface";
// import { IRol } from "../../../../interfaces/rol.interface";
import { ISubRol } from "../../../../interfaces/subrol.interface";

interface ISubRolStore {
  showForm: boolean;
  toggleForm: () => void;
  setRol: (subRol: ISubRol) => void;
  subRol?: ISubRol; 
  modeForm: MODEFORMENUM;
  setModeForm: (mode: MODEFORMENUM) => void;
  titleForm?: string;
  showDeleteModal: boolean;
}

export const useSubRolStore = create<ISubRolStore>()((set, get) => ({
    showForm: false,
    modeForm: MODEFORMENUM.CREATE,
    setRol: (subRol: ISubRol) => set({ subRol }), 
    setModeForm: (mode: MODEFORMENUM) => 
      set({ modeForm: mode, titleForm: mode === MODEFORMENUM.CREATE ? "Nuevo Sub-Rol" : "Editar sub-Rol" }),
    toggleForm: () => set({ showForm: !get().showForm }),
    // rol: undefined, 
    // titleForm: "",
    showDeleteModal: false,
  }));
  
