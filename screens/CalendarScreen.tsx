import React, { useState } from "react";
import { View, Text } from "react-native";
import { Calendar } from "react-native-calendars";

export default function CalendarScreen() {
  const [selected, setSelected] = useState("");

  return (
    <View style={{ flex: 1, paddingTop: 50 }}>
      <Calendar
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        markedDates={{
          [selected]: { selected: true, selectedColor: "#2563eb" },
        }}
      />
      {selected ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          選択した日付: {selected}
        </Text>
      ) : null}
    </View>
  );
}
