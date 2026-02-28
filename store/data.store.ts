import { create } from "zustand";
import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Food = {
  date: string;
  type: string;
  calories: number;
};

interface DataStore {
  goal: number;
  food: Food[] | [];

  //set actions
  setGoal: (goal: number) => void;
  setFood: (food: Food[]) => void;
}

export const useDataStore = create<DataStore>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        goal: 2000,
        food: [],

        setGoal: (goal: number) => {
          set({ goal });
        },
        setFood: (food: Food[]) => {
          set({ food });
        },
      }),
      {
        name: "data-storage",
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
  ),
);
