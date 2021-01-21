import create from "zustand";

export const VisitStore = create((set) => ({
    date: null,
    diagnosis: null,
    pres: null,
    PatientId: null,
    setDate: (date) => set({ date }),
    setDiagnosis: (diagnosis) => set({ diagnosis }),
    setPres: (pres) => set({ pres }),
    setPatientId: (PatientId) => set({ PatientId })
}));
