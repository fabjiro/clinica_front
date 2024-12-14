import { create } from "zustand";

interface IPatientStore {
    showForm: boolean;
    toggleForm: () => void;
    // setPatient: (patient: IPatient) => void;
    // patient?: IPatient;
    // modeForm: MODEFORMENUM;
    // setModeForm: (mode: MODEFORMENUM) => void;
    // titleForm?: string;
    // showDeleteModal: boolean;
}

export const usePatientStore = create<IPatientStore>()((set, get) => ({
    showForm: false,
    toggleForm: () => set({ showForm: !get().showForm }),
    // setPatient: (patient: IPatient) => set({ patient }),
    // patient: undefined,
    // modeForm: MODEFORMENUM.CREATE,
    // setModeForm: (mode: MODEFORMENUM) => set({ modeForm: mode }),
    // titleForm: "",
    // showDeleteModal: false,
  }));