import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { Text, View } from "../components/Themed";

import Scanner2 from "../components/Scanner2";

export default function ModalScreen({ route }) {
  const { user_id } = route.params;
  console.log("Modal nuevo tema usuario: ", user_id);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Escanea el código QR para suscribirte</Text>
      <Scanner2 user_id={user_id}></Scanner2>
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
