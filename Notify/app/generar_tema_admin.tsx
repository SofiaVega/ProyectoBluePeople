import {
  StyleSheet,
  Button,
  Switch,
  Image,
  SafeAreaView,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { Feather } from "@expo/vector-icons";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import ComponenteTemaConfig from "../components/ComponenteTemaConfig";
import { color } from "@rneui/themed/dist/config";
import ComponenteHeader from "../components/ComponenteHeader";
import { Link, Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import ngrok_url from "../constants/serverlink";
import AuthContext from "../components/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Tema = {
  titulo: string;
  descripcion: string;
};

export default function GenerateTopic({ route }) {
  const { user_id } = route.params;
  console.log("CREATE THEME SCREEN user :", user_id);
  const navigator = useNavigation();
  const [isEnabled, setIsEnabled] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //Change toggle value
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  //API CALL
  const handleThemeGeneration = async (e) => {
    //Generate cod "randomly"
    const character = title + user_id;
    let cod = " ";
    for (let i = 0; i < character.length; i++) {
      cod += character.charAt(Math.floor(Math.random() * character.length));
    }

    e.preventDefault();
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("x-user-id", `${user_id}`);
    const data = {
      title: title,
      user_id: user_id,
      description: description,
      accesoMensajesPrev: isEnabled,
      cod: cod,
    };
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };
    await fetch(ngrok_url + `/api/topic`, requestOptions)
      .then((response) => {
        console.log(response.headers.get("x-user-id"));
        return response.text();
        // response.json()
      })
      .then((res) => console.log(res));
    Alert.alert("Éxito", "Nuevo tema generado", [
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
    navigator.goBack();
  };
  //Frontend
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
          <View
            style={[
              {
                backgroundColor: "#fdfdfd",
                flexDirection: "column",
                alignItems: "center",
              },
            ]}
          >
            <Image
              source={require("./../assets/images/favicon.png")}
              style={{
                width: 50,
                height: 50,
                borderRadius: 30 / 2,
                marginBottom: 30,
                marginTop: 40,
              }}
            />
          </View>
          <View style={[styles.temaContainerInputs]}>
            <Text style={[styles.titleInput]}>Titulo</Text>
            <TextInput
              style={[styles.input]}
              placeholder="Titulo"
              placeholderTextColor={"rgba(0,0,0,0.10)"}
              value={title}
              onChangeText={setTitle}
            />
          </View>
          <View style={[styles.temaContainerInputs]}>
            <Text style={[styles.titleInput]}>Descripcion</Text>
            <TextInput
              style={[styles.input]}
              placeholder="Descripcion"
              placeholderTextColor={"rgba(0,0,0,0.10)"}
              value={description}
              onChangeText={setDescription}
            />
          </View>
          <View
            style={[
              {
                backgroundColor: "#fdfdfd",
                flexDirection: "column",
                alignItems: "center",
              },
            ]}
          >
            {/* <Link href="/QRGenerate" asChild > */}
            {/* <Pressable
              style={[
                styles.buttonContainer,
                { backgroundColor: "#DB8A74", marginBottom: 30 },
              ]}
            >
              <Text style={styles.textoButton}>Genrar QR</Text>
            </Pressable> */}
            {/* </Link> */}
            {/* <Link href="/QRGenerate" asChild>
                <Pressable style={[styles.button, {backgroundColor: "#DB8A74", marginBottom: 30}]}>
                  {({ pressed }) => (<Text style={styles.textoButton}>Genrar QR</Text>)}
                </Pressable>
              </Link> */}
            {/* <Pressable
              style={[
                styles.buttonContainer,
                { backgroundColor: "#DB8A74", marginBottom: 30 },
              ]}
            >
              <Text style={styles.textoButton}>Generar Tema</Text>
            </Pressable> */}
            <View
              style={[
                styles.temaContainer,
                { flexDirection: "row", alignItems: "center" },
              ]}
            >
              <Text style={styles.textoTema}>Mensajes Previos</Text>

              <Switch
                onValueChange={toggleSwitch}
                value={isEnabled}
                trackColor={{ true: "#DB8A74", false: "grey" }}
                style={[{ margin: 20 }]}
                ios_backgroundColor="black"
              ></Switch>
            </View>
            <Pressable
              style={[styles.buttonContainer, { marginBottom: 20 }]}
              onPress={handleThemeGeneration}
            >
              <Text style={styles.textoButton}>Generar Tema</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: "#fdfdfd",
  },
  temaContainer: {
    backgroundColor: "#fdfdfd",
    borderRadius: 10,
    marginLeft: 10,
  },
  temaContainerInputs: {
    backgroundColor: "#fdfdfd",
    borderRadius: 10,
    padding: 10,
  },
  titleInput: {
    fontSize: 18,
    fontWeight: "500",
    paddingLeft: 10,
    color: "black",
    fontFamily: "PoppinsMedium",
  },
  input: {
    backgroundColor: "#fdfdfd",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.10)",
    fontSize: 15,
    color: "black",
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#EF3E36",
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fdfdfd",
    fontSize: 10,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    color: "#fdfdfd",
  },
  buttonContainer: {
    backgroundColor: "#EF3E36",
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fdfdfd",
    fontSize: 10,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    color: "#fdfdfd",
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 10,
    color: "black",
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  textoTema: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    color: "#272727",
    paddingLeft: 10,
    fontFamily: "PoppinsMedium",
  },
  textoButton: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    color: "#fdfdfd",
    fontWeight: "bold",
    fontFamily: "PoppinsSemiBold",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
});
