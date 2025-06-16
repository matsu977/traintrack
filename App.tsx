import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CalendarScreen from "./screens/CalendarScreen";
import EditScreen from "./screens/EditScreen";
import { Workout } from "./types";
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from "react-native-paper";

export type RootStackParamList = {
  Calendar: undefined;
  Edit: { date: string; workout?: Workout };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#ffffff",
    surface: "#ffffff",
  },
};


export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Calendar" component={CalendarScreen} options={{ title: "トレーニング記録" }} />
          <Stack.Screen name="Edit" component={EditScreen} options={{ title: "記録を書く" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}