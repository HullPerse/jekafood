import { create } from "zustand";
import {
  createJSONStorage,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Food = {
  date: string;
  type: string;
  calories: number;
};

interface DataStore {
  current: number;
  goal: number;
  food: Food[] | [];

  //set actions
  setCurrent: (current: number) => void;
  setGoal: (goal: number) => void;
  setFood: (food: Food[]) => void;
}

export const useDataStore = create<DataStore>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        current: 0,
        goal: 2000,
        food: [],

        setCurrent: (current: number) => {
          set({ current });
        },
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
