import AsyncStorage from "@react-native-async-storage/async-storage";
import { Training } from "../types";

const STORAGE_KEY = "trainings";

export const saveTrainings = async (trainings: Training[]) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(trainings));
};

export const loadTrainings = async (): Promise<Training[]> => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};
