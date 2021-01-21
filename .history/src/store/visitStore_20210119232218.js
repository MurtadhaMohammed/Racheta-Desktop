import create from "zustand";

export const VisitStore = create((set) => ({
    date: null,
    diagnosis: null,
    pres: null,
    PatientId: null,
    setDate: (name) => set({ name }),
    setDiagnosis: (name) => set({ name }),
    setPres: (name) => set({ name }),
    setPatientId: (PatientId) => set({ PatientId })
}));
