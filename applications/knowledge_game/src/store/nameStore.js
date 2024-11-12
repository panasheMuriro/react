import {create} from 'zustand';

const useNameStore = create((set) => ({
  myName: '',
  setMyName: (name) => set({ myName: name }),
  clearMyName: () => set({ myString: '' }),
}));

export default useNameStore;
