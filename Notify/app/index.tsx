import 'react-native-gesture-handler';
import { StyleSheet, SafeAreaView, TextInput, Dimensions } from "react-native";

import ComponenteTemaFila from "../components/ComponenteTemaFila";
import ComponenteHeader from "../components/ComponenteHeader";
import { Text, View } from "../components/Themed";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Topic } from "../interface";
import React, { useEffect, useState } from "react";
import registerForPushNot from './registerForPushNot';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Feather } from "@expo/vector-icons";
import ngrok_url from "../constants/serverlink";
import { useFonts } from 'expo-font';

const parseUserData = (user: Topic) => {
  const { titulo, descripcion, id } = user;
  return {
    titulo: titulo,
    descripcion: descripcion,
    id: id,
  };
};

export default function PaginaPrincipalScreen() {
  const [fontsLoaded] = useFonts({
    PoppinsBlack: require("../assets/fonts/Poppins-Black.ttf"),
    PoppinsBlackItalic: require("../assets/fonts/Poppins-BlackItalic.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsBoldItalic: require("../assets/fonts/Poppins-BoldItalic.ttf"),
    PoppinsExtraBold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    PoppinsExtraBoldItalic: require("../assets/fonts/Poppins-ExtraBoldItalic.ttf"),
    PoppinsExtraLight: require("../assets/fonts/Poppins-ExtraLight.ttf"),
    PoppinsExtraLightItalic: require("../assets/fonts/Poppins-ExtraLightItalic.ttf"),
    PoppinsItalic: require("../assets/fonts/Poppins-Italic.ttf"),
    PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
    PoppinsLightItalic: require("../assets/fonts/Poppins-LightItalic.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsMediumItalic: require("../assets/fonts/Poppins-MediumItalic.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsSemiBoldItalic: require("../assets/fonts/Poppins-SemiBoldItalic.ttf"),
    PoppinsThin: require("../assets/fonts/Poppins-Thin.ttf"),
    PoppinsThinItalic: require("../assets/fonts/Poppins-ThinItalic.ttf"),
    DroidSans: require("../assets/fonts/DroidSans.ttf"),
    DroidSansBold: require("../assets/fonts/DroidSans-Bold.ttf"),

  })
  const [state, setState] = useState<Topic[]>([]);

  useEffect(() => {
    const api = async () => {
      try {
        const data = await fetch(ngrok_url + "/api/subscriptions", {
          method: "GET",
          headers: {
            "x-user-id": "5",
            "Content-Type": "application/json",
          },
        });
        if (!data.ok) {
          console.error(
            `API responded with status ${data.status}: ${data.statusText}`
          );
        }

        const jsonData = await data.json();
        const topics = jsonData.map(parseUserData);
        return setState([...state, ...topics]);
        // return setState(jsonData.results);
      } catch (e) {
        console.error(e);
      }
    };
    api();
  }, []);

console.log("ESTADPPP", state);
  useEffect(() => {
    registerForPushNot()
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#E8F1F2" }}>
      <ComponenteHeader></ComponenteHeader>
      <View style={[{ flexDirection: "column", justifyContent: 'space-between', backgroundColor: '#E8F1F2' }]}>
        <View style={[{ flexDirection: "row", backgroundColor: '#E8F1F2' }]}>
          <View style={[{ flexDirection: "row", backgroundColor: '#fdfdfd' }, styles.input]}>
            <Feather name="search" size={20} color="black" style={{ marginLeft: 1, marginRight: 4 }} />
            <TextInput placeholder="Buscar"/>
          </View>
          <Link href="/config_tema" asChild >
            <Pressable style={styles.plusContainer}>
              {({ pressed }) => (<FontAwesome name="plus" size={15} color="#fdfdfd" style={[{ opacity: pressed ? 0.5 : 1 },]} />)}
            </Pressable>
          </Link>
        </View>
      </View>
      <View style={[styles.temaContainer]}>
        <View style={[{ marginLeft: 20, marginTop: 20, marginRight: 20, backgroundColor: '#fdfdfd'}]}>
          <Text style={styles.title}>Temas</Text>
          <ComponenteTemaFila comps={state}/>
        </View>
      </View>
    </SafeAreaView>
  );
}
const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  temaContainer: {
    backgroundColor: "#fdfdfd",
    borderRadius: 20,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 30,
    marginBottom: 30,
    // height: screen.width * 0.9,
    width: screen.width * 0.9,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: 'rgba(69,119,187,0.15)',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(69,119,187,0.15)',
    fontSize: 15,
    color: 'black',
    marginRight: 10,
    marginLeft: 20,
    marginTop: 30
  },
  plusContainer: {
    backgroundColor: '#4577BB',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fdfdfd',
    fontSize: 10,
    color: '#fdfdfd',
    marginTop: 30
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
    paddingLeft: 10,
    fontFamily: "PoppinsMedium"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  white_background: {
    backgroundColor: "white",
  },
});
