import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper"; // ← 追加
import CalendarScreen from "./screens/CalendarScreen";
import EditScreen from "./screens/EditScreen";
import { View, Text, Button } from "react-native";

export type RootStackParamList = {
  Home: undefined;
  Calendar: undefined;
  Edit: { date: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, marginBottom: 16 }}>ホーム画面</Text>
      <Button title="カレンダーを見る" onPress={() => navigation.navigate("Calendar")} />
    </View>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Calendar" component={CalendarScreen} options={{ title: "筋トレ記録" }} />
          <Stack.Screen name="Edit" component={EditScreen} options={{ title: "記録を書く" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
