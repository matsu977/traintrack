import { useCallback, useState } from "react";
import { View, FlatList, Text, Button } from "react-native";
import { Calendar } from "react-native-calendars";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { Workout } from "../types";
import { loadWorkouts } from "../utils/storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

export default function CalendarScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));

  useFocusEffect(
    useCallback(() => {
      const fetch = async () => {
        const data = await loadWorkouts();
        setWorkouts(data);
      };
      fetch();
    }, [])
  );

  const todays = workouts.filter((w) => w.date === selectedDate);

  const marked = workouts.reduce<Record<string, any>>((acc, cur) => {
    acc[cur.date] = { marked: true, dotColor: "#2563eb" };
    return acc;
  }, {});
  marked[selectedDate] = {
    ...(marked[selectedDate] || {}),
    selected: true,
    selectedColor: "#2563eb",
  };

  return (
    <View style={{ flex: 1 }}>
      <Calendar
        markedDates={marked}
        onDayPress={(day) => setSelectedDate(day.dateString)}
      />

      <FlatList
        data={todays}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20 }}>記録がありません</Text>}
        renderItem={({ item }) => (
          <View style={{ borderBottomWidth: 1, borderColor: "#ccc", padding: 12 }}>
            <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
            {item.memo ? <Text style={{ marginTop: 4 }}>{item.memo}</Text> : null}
          </View>
        )}
      />

      <Button
        title="この日の記録を書く"
        onPress={() => navigation.navigate("Edit", { date: selectedDate })}
      />
    </View>
  );
}