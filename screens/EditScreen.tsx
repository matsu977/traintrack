import { View } from "react-native";
import { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { saveWorkouts, loadWorkouts } from "../utils/storage";
import { v4 as uuidv4 } from "uuid";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type EditScreenRouteProp = RouteProp<RootStackParamList, "Edit">;

export default function EditScreen({ route }: { route: EditScreenRouteProp }) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { date } = route.params ?? { date: undefined };
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");

  const onSave = async () => {
    if (!title.trim()) return;
    const newWorkout = {
      id: uuidv4(),
      date: date ?? new Date().toISOString().slice(0, 10),
      title,
      memo,
    };
    const existing = await loadWorkouts();
    await saveWorkouts([newWorkout, ...existing]);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        label="種目"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        style={{ marginBottom: 16 }}
      />
      <TextInput
        label="メモ"
        value={memo}
        onChangeText={setMemo}
        mode="outlined"
        multiline
        numberOfLines={4}
        style={{ marginBottom: 16 }}
      />
      <Button mode="contained" onPress={onSave}>
        保存
      </Button>
    </View>
  );
}