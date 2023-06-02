import React, { useState } from "react";
import {
  View,
  TextInput,
  SafeAreaView,
  Text,
  StyleSheet,
  Pressable,
  Switch,
  Alert,
  ScrollView,
} from "react-native";
import ComponenteHeader from "./ComponenteHeader";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import ngrok_url from "../constants/serverlink";

export default function ComponenteCrearNotif({ route }) {
  const { tema, userId } = route.params;
  const [tituloNotificacion, setTituloNotificacion] = useState("");
  const [textoNotificacion, setTextoNotificacion] = useState("");
  const [pushNotif, setPushNotif] = useState(false);
  const navigation = useNavigation();
  const toggleSwitch = () => {
    console.log("toggle switch");
    setPushNotif((previousState) => !previousState);
    console.log(pushNotif);
  };
  const sendPushNotif = async () => {
    console.log("hola send push notif");
    const datos = {
      title: tituloNotificacion,
      body: textoNotificacion,
    };
    console.log("MENSAJE!!! : ", datos);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-user-id": userId },
      body: JSON.stringify(datos),
    };
    await fetch(ngrok_url + `/api/sendNot/${userId}/${tema.id}`, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log("ERROR PUSH NOTIF", error))
      .then((res) => console.log("PUSH STATUS:", res));
  };
  const handlePostNotif = async () => {
    console.log(pushNotif);
    const datos = {
      tema_id: tema.id,
      mensaje: tituloNotificacion,
      pushNotifEnabled: pushNotif,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-user-id": userId },
      body: JSON.stringify(datos),
    };
    await fetch(ngrok_url + `/api/postnotif`, requestOptions)
      .then((response) => response.json())
      .then((res) => console.log(res));
    if (pushNotif == true) {
      sendPushNotif();
      Alert.alert("Éxito", `Nuevo notificación en tema ${tema.titulo}`, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#E8F1F2" }}>
      <ComponenteHeader></ComponenteHeader>
      <View
        style={{
          marginLeft: 20,
          marginTop: 20,
          marginRight: 20,
          borderRadius: 20,
          backgroundColor: "#fdfdfd",
        }}
      >
        <View style={[styles.temaContainer, { flexDirection: "column" }]}>
          <Text style={styles.title}>Nueva Notificación</Text>

          <Text style={styles.titleInput}>Ingresa el título:</Text>
          <TextInput
            placeholder="Título notificación"
            placeholderTextColor="grey"
            style={styles.input}
            onChangeText={setTituloNotificacion}
            value={tituloNotificacion}
            autoCapitalize="none"
          />

          <Text style={styles.titleInput}>Notificación:</Text>
          <TextInput
            placeholder="Texto notificación"
            placeholderTextColor="grey"
            style={styles.input}
            onChangeText={setTextoNotificacion}
            value={textoNotificacion}
            autoCapitalize="none"
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingEnd: 30,
            }}
          >
            <Text style={styles.titleSwitch}> Push notifications </Text>
            <View style={{ paddingTop: 20 }}>
              <Switch
                onValueChange={toggleSwitch}
                value={pushNotif}
                trackColor={{ true: "#DB8A74", false: "grey" }}
                style={styles.switch}
              ></Switch>
            </View>
          </View>

          <View style={{ paddingTop: 25, paddingBottom: 25 }}>
            <Pressable style={styles.buttonContainer} onPress={handlePostNotif}>
              <Text style={styles.textoButton}>Enviar notificación</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#DB8A74",
    padding: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#fdfdfd",
    fontSize: 10,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    color: "#fdfdfd",
    alignSelf: "center",
  },
  textoButton: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    color: "#fdfdfd",
    fontWeight: "bold",
    fontFamily: "PoppinsSemiBold",
  },
  temaContainer: {
    backgroundColor: "#fdfdfd",
    borderRadius: 10,
    marginLeft: 10,
  },
  input: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 10,
    height: 40,
    margin: 12,
    borderColor: "lightgrey",
    backgroundColor: "#fdfdfd",
    fontFamily: "PoppinsRegular",
    color: "black",
  },
  titleInput: {
    fontFamily: "PoppinsRegular",
    padding: 5,
    paddingStart: 15,
    paddingTop: 40,
    color: "black",
  },
  titleSwitch: {
    fontFamily: "PoppinsRegular",
    padding: 5,
    paddingStart: 15,
    paddingTop: 40,
    fontSize: 15,
    color: "black",
  },
  switch: {
    margin: 20,
    alignSelf: "flex-end",
  },
  title: {
    fontFamily: "PoppinsBold",
    padding: 5,
    paddingStart: 15,
    paddingTop: 30,
    fontSize: 20,
    color: "black",
  },
});
