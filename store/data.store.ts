import { create } from "zustand";
import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface DataStore {
  current: number;
  goal: number;

  //set actions
  setCurrent: (current: number) => void;
  setGoal: (goal: number) => void;
}

export const useDataStore = create<DataStore>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        current: 0,
        goal: 2000,

        setCurrent: (current: number) => {
          set({ current });
        },
        setGoal: (goal: number) => {
          set({ goal });
        },
      }),
      {
        name: "data-storage",
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
  ),
);
