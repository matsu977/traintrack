import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import AddScreen from "./screens/AddScreen";

export type RootStackParamList = {
  Home: undefined;
  Add: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "筋トレメモ" }} />
        <Stack.Screen name="Add" component={AddScreen} options={{ title: "追加" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
