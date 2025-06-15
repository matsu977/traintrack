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