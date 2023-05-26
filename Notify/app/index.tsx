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
import React, { useEffect, useState, createContext } from "react";
import registerForPushNot from "./registerForPushNot";
import { NavigationContainer } from "@react-navigation/native";
import PaginaPrincipalScreen from "../components/PaginaPrincipalScreen";
import { createStackNavigator } from "@react-navigation/stack";
import RegisterScreen from "./RegisterScreen";
import TemaScreen from "./tema";
import nuevoTema from "./modal_nuevo_tema";
import ngrok_url from "../constants/serverlink";
import ConfigTemaScreen from "./config_tema";
import AuthContext from "../components/context";
import LoginScreen from "./LoginScreen";
import GenerateTheme from "./generar_tema_admin";
import ConfigTemaAdminScreen from "./config_tema_admin";
import QRGenerate from "./QRGenerate";

const Stack = createStackNavigator();

const clearAsyncStorage = async () => {
  try {
    AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
    console.log("AsyncStorage cleared successfully");
  } catch (error) {
    console.log("Error clearing AsyncStorage: ", error);
  }
};

export default function Home() {
  clearAsyncStorage();
  const [userId, setUserId] = useState<String | null>(null);
  const [admin, setAdmin] = useState<Boolean>(false);
  const authContext = {
    userId: userId,
    register: (id) => {
      setUserId(id);
    },
    is_admin: admin,
    register_admin: (is_admin) => {
      setAdmin(is_admin);
    },
  };
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
      <AuthContext.Provider value={authContext}>
        <Stack.Navigator>
          {userId ? (
            <>
              <Stack.Screen name="home" component={PaginaPrincipalScreen} />
              <Stack.Screen name="themeInfo" component={TemaScreen} />
              <Stack.Screen name="themeConfig" component={ConfigTemaScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="register" component={RegisterScreen} />
              <Stack.Screen name="zlogin" component={LoginScreen} />
            </>
          )}
          {userId && admin ? (
            <>
              <Stack.Screen
                name="adminConfig"
                component={ConfigTemaAdminScreen}
              />
              <Stack.Screen name="themeGenerate" component={GenerateTheme} />
              <Stack.Screen name="nuevoTema" component={nuevoTema} />
              <Stack.Screen name="QRGenerate" component={QRGenerate} />
            </>
          ) : (
            <></>
          )}
        </Stack.Navigator>
      </AuthContext.Provider>
    </NavigationContainer>
  );
}
