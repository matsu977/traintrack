import { useCallback, useState } from "react";
import { View, FlatList } from "react-native";
import { Calendar } from "react-native-calendars";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { Workout } from "../types";
import { loadWorkouts } from "../utils/storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { Text, Button, Card } from "react-native-paper";

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
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20, color: "#999" }}>
            記録がありません
          </Text>
        }
        renderItem={({ item }) => (
          <Card
            style={{ marginHorizontal: 16, marginVertical: 8 }}
            onPress={() => navigation.navigate("Edit", { date: item.date, workout: item })}
          >
            <Card.Title title={item.title} />
            {item.memo && (
              <Card.Content>
                <Text>{item.memo}</Text>
              </Card.Content>
            )}
          </Card>
        )}
      />

      <Button
        mode="contained"
        onPress={() => navigation.navigate("Edit", { date: selectedDate })}
        style={{ margin: 16 }}
      >
        この日の記録を書く
      </Button>
    </View>
  );
}