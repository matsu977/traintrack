import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loadTrainings, saveTrainings } from "../utils/storage";
import { Training } from "../types";
import { v4 as uuidv4 } from "uuid";

export default function AddScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");

  const onSave = async () => {
    if (!title.trim()) {
      Alert.alert("トレーニング名は必須です");
      return;
    }
    const newTraining: Training = {
      id: uuidv4(),
      title,
      memo,
    };
    const existing = await loadTrainings();
    await saveTrainings([newTraining, ...existing]);
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        placeholder="トレーニング名"
        value={title}
        onChangeText={setTitle}
        style={{ borderBottomWidth: 1, marginBottom: 16 }}
      />
      <TextInput
        placeholder="メモ（例：60kg×10回×3セット）"
        value={memo}
        onChangeText={setMemo}
        style={{ borderBottomWidth: 1, marginBottom: 16 }}
      />
      <Button title="保存" onPress={onSave} />
    </View>
  );
}
