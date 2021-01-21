import create from "zustand";

export const VisitStore = create((set) => ({
    date: null,
    diagnosis: null,
    pres: null,
    PatientId: null,
    setName: (name) => set({ name }),
    setPatientId: (PatientId) => set({ PatientId })
}));
