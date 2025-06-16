import { useState } from "react";
import { TextInput, Button, Card } from "react-native-paper";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { saveWorkouts, loadWorkouts, deleteWorkout, updateWorkout } from "../utils/storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Workout } from "../types";


const generateId = () => Math.random().toString(36).substring(2, 10);

export type EditScreenRouteProp = RouteProp<RootStackParamList, "Edit">;

export default function EditScreen({ route }: { route: EditScreenRouteProp }) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { date, workout } = route.params ?? { date: undefined, workout: undefined };
  const [title, setTitle] = useState(workout?.title || "");
  const [memo, setMemo] = useState(workout?.memo || "");

  const onSave = async () => {
    if (!title.trim()) {
      alert("タイトルを入力してください");
      return;
    }
  
    try {
      const newWorkout: Workout = {
        id: workout?.id ?? generateId(),
        date: date ?? new Date().toISOString().slice(0, 10),
        title,
        memo,
      };
  
      if (workout) {
        await updateWorkout(newWorkout);
      } else {
        const existing = await loadWorkouts();
        await saveWorkouts([newWorkout, ...existing]);
      }
  
      navigation.goBack();
    } catch (error) {
      console.error("保存エラー:", error);
      alert("保存中にエラーが発生しました");
    }
  };

  const onDelete = async () => {
    if (workout) {
      await deleteWorkout(workout.id);
      navigation.goBack();
    }
  };

  return (
    <Card style={{ margin: 16, padding: 16 }}>
      <Card.Title title={date ? `${date} の記録` : "新規記録"} />
      <Card.Content>
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
        <Button mode="contained" onPress={onSave} style={{ marginBottom: 12 }}>
          保存
        </Button>
        {workout && (
          <Button mode="outlined" onPress={onDelete} textColor="red">
            削除する
          </Button>
        )}
      </Card.Content>
    </Card>
  );
}
