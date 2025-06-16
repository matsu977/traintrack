import AsyncStorage from "@react-native-async-storage/async-storage";
import { Workout } from "../types";

const KEY = "workouts";

export const loadWorkouts = async (): Promise<Workout[]> => {
  const json = await AsyncStorage.getItem(KEY);
  return json ? JSON.parse(json) : [];
};

export const saveWorkouts = async (data: Workout[]) => {
  await AsyncStorage.setItem(KEY, JSON.stringify(data));
};

export const deleteWorkout = async (id: string) => {
  const data = await loadWorkouts();
  const updated = data.filter((w) => w.id !== id);
  await saveWorkouts(updated);
};

export const updateWorkout = async (updatedWorkout: Workout) => {
  const data = await loadWorkouts();
  const updated = data.map((w) => (w.id === updatedWorkout.id ? updatedWorkout : w));
  await saveWorkouts(updated);
};