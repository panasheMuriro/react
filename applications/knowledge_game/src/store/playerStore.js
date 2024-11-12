import create from "zustand";

const usePlayerStore = create((set) => ({
  name: "",
  food: "",
  country: "",
  animal: "",
  setName: (name) => set({ name }),
  setFood: (food) => set({ food }),
  setCountry: (country) => set({ country }),
  setAnimal: (animal) => set({ animal }),
}));

export default usePlayerStore;