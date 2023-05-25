import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useEffect, useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Scanner from "../components/Scanner";
import Scanner2 from "../components/Scanner2";
import ScannerContainer from "../components/ScannerContainer";
import ngrok_url from "../constants/serverlink";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../components/context";

const Stack = createNativeStackNavigator();

export default function ModalScreen() {
  const [temasID, settemasID] = useState("");
  const [subscriptorID, setsubscriptorID] = useState("");


  const onTitleChange = (e) => settemasID(e.target.value);
  const onBodyChange = (e) => setsubscriptorID(e.target.value);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Escanea el código QR para suscribirte
      </Text>
      <Scanner2></Scanner2>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#E8F1F2",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    padding: "5%",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
