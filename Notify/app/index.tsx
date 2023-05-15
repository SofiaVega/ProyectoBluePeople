import "react-native-gesture-handler";
import {
  StyleSheet,
  SafeAreaView,
  TextInput,
  Dimensions,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Topic } from "../interface";
import React, { useEffect, useState } from "react";
import registerForPushNot from "./registerForPushNot";
import { NavigationContainer } from "@react-navigation/native";
import PaginaPrincipalScreen from "../components/PaginaPrincipalScreen";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import TemaScreen from "./tema";
import nuevoTema from "./modal_nuevo_tema";
import ngrok_url from "../constants/serverlink";
import ConfigTemaScreen from "./config_tema";

const Stack = createStackNavigator();

export default function Home() {
  const [userId, setUserId] = useState<String | null>(null);
  useEffect(() => {
    //Check if user is logged in using asyncStorage
    async function getUserId() {
      const storedId = await AsyncStorage.getItem("userId");
      console.log(storedId + "storedId");
      setUserId(storedId);
    }
    getUserId();
    console.log(userId);
  }, []);
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        {!userId ? (
          <Stack.Screen name="home" component={PaginaPrincipalScreen} />
        ) : (
          <Stack.Screen name="login" component={LoginScreen} />
        )}
        <Stack.Screen name="themeInfo" component={TemaScreen} />
        <Stack.Screen name="nuevoTema" component={nuevoTema} />
        <Stack.Screen name="themeConfig" component={ConfigTemaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
