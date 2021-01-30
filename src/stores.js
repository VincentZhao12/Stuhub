import create from "zustand";

export const useClassCode = create((set) => ({
  classCode: "",
  updateClass: (code) => set({ classCode: code }),
}));
