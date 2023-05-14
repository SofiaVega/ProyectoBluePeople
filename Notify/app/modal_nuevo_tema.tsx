import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { useState } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Scanner from "../components/Scanner";
import Scanner2 from "../components/Scanner2";
import ScannerContainer from "../components/ScannerContainer";
import ngrok_url from "../constants/serverlink";

const Stack = createNativeStackNavigator();

export default function ModalScreen() {
  const [temasID, settemasID] = useState("");
  const [subscriptorID, setsubscriptorID] = useState("");

  const onTitleChange = (e) => settemasID(e.target.value);
  const onBodyChange = (e) => setsubscriptorID(e.target.value);

  // const api = async() => {
  //   const id = 302
  //   try{
  //     const data = await fetch(`http://localhost:3000/api/subscribe/${temasID}`, {
  //       method: "POST",
  //       headers: {
  //         'x-user-id': '5',
  //         'Content-Type': 'application/json'
  //       },
  //       body{
  //         temas_id: temasID,
  //         suscripto_id: subscriptorID
  //       }

  //     });
  //     if(!data.ok) {
  //       console.error(`API responded with status ${data.status}: ${data.statusText}`)
  //     }

  //     const jsonData:MensajesScreen[] = await data.json();
  //     // console.log("DATAAAAAA ", jsonData)
  //     // const topics = jsonData.map(parseUserData)
  //     // console.log("TOPICSO", jsonData)

  //     setState([...state, ...jsonData])
  //     setLoading(false);
  //     // return setState(jsonData.results);
  //   }catch(e) {
  //       console.error("ERROR", e)
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { temas_id: temasID, suscriptor_id: subscriptorID };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-user-id": "5" },
      body: JSON.stringify(data),
    };
    await fetch(
      ngrok_url + `/api/subscribe/${temasID}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((res) => console.log(res));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Presiona el botón para escanear el código QR
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F1F2",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
