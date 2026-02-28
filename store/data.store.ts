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

export type Preset = {
  id: string;
  label: string;
  icon: string;
  calories: number;
  valueType: string;
};

interface DataStore {
  goal: number;
  food: Food[] | [];
  presets: Preset[];

  //set actions
  setGoal: (goal: number) => void;
  setFood: (food: Food[]) => void;
  setPresets: (presets: Preset[]) => void;
  addPreset: (preset: Preset) => void;
  removePreset: (id: string) => void;
}

export const useDataStore = create<DataStore>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        goal: 2000,
        food: [],
        presets: [],

        setGoal: (goal: number) => {
          set({ goal });
        },
        setFood: (food: Food[]) => {
          set({ food });
        },
        setPresets: (presets: Preset[]) => {
          set({ presets });
        },
        addPreset: (preset: Preset) => {
          set((state) => ({ presets: [...state.presets, preset] }));
        },
        removePreset: (id: string) => {
          set((state) => ({ presets: state.presets.filter((p) => p.id !== id) }));
        },
      }),
      {
        name: "data-storage",
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
  ),
);
