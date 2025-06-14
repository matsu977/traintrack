import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loadTrainings } from "../utils/storage";
import { Training } from "../types";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [trainings, setTrainings] = useState<Training[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await loadTrainings();
      setTrainings(data);
    };
    const unsubscribe = navigation.addListener("focus", load);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="＋ 追加" onPress={() => navigation.navigate("Add" as never)} />
      <FlatList
        data={trainings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 12 }}>
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.title}</Text>
            <Text>{item.memo}</Text>
          </View>
        )}
      />
    </View>
  );
}
