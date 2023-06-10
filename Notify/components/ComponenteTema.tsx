import React, { useEffect, useState } from "react";
import { StyleSheet, Image, SafeAreaView, ScrollView } from "react-native";
import { Text, View } from "./Themed";
import { Pressable } from "react-native";
import { MensajesScreen } from "../interface";
import ComponenteMensaje from "./ComponenteMensaje";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import ngrok_url from "../constants/serverlink";
import { useFonts } from "expo-font";
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/native";

export default function ComponenteTema({ tema, userId }) {
  const [isLoading, setLoading] = useState(true);
  const [mensajes, setMensajes] = useState<MensajesScreen[]>([]);
  console.log("TEMA:", tema, " de usuario", userId);
  const isFocused = useIsFocused();
  console.log("USEISFOCUSED", isFocused);
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
  });

  var frec: any;
  var inter = 5000;
  var flagA = false;
  useEffect(() =>  {
    const api = async () => {
      try {
        const data = await fetch(ngrok_url + `/api/topic/${tema.id}/messages`, {
          method: "GET",
          headers: {
            "x-user-id": `${userId}`,
            "Content-Type": "application/json",
          },
        });
        if (!data.ok) {
          console.error(
            `API responded with status ${data.status}: ${data.json} in ComponenteTema`
          );
        }
        const jsonData: MensajesScreen[] = await data.json();
        console.log("Messages: ", jsonData);
        setMensajes(jsonData);
        setLoading(false);
      } catch (e) {
        console.error("ERROR", e);
      }
    };
    const gfrec = async () => {
      try {
        const data = await fetch(ngrok_url + `/api/frecmsj/${tema.id}`, {
          method: "GET",
          headers: {
            "x-user-id": `${userId}`,
            "Content-Type": "application/json",
          },
        });
        if (!data.ok) {
          console.error(`API responded with status ${data.status}`);
        }
        const jsonData = await data.json();
        return Number(jsonData);
      } catch (e) {
        console.error(e);
      }
    };
    api();
    const setInter = async () => {
      frec = await gfrec();
      console.log('frec ' + frec)
      inter = (Number(frec) * 60 * 1000)
      console.log('inter de ' + inter)
    };
    setInter();
    function invoke(){
      const frecInterval = setInterval(() => {
        if(flagA == false){
          flagA = true;
          window.clearInterval(frecInterval);
          invoke();
        }
        else{
          console.log('intervalo ' + inter);
          api();
          console.log('refreshed');
        }
      }, inter);
    }
    if (isFocused) {
      console.log("rendering ...");
      flagA = false;
      setInter();
      invoke();
    }
  }, [isFocused]);

  const navigation = useNavigation();

  const handleConfig = (tema, userId) => {
    console.log("THEME CONFIG: ", tema);
    navigation.navigate("themeConfig", { tema, userId });
  };

  return isLoading ? (
    <Text>Loading ...</Text>
  ) : (
    <SafeAreaView style={styles.temaContainer}>
      <View
        style={[
          styles.boxContainer,
          { flexDirection: "row", alignItems: "center" },
        ]}
      >
        <Image
          source={require("./../assets/images/favicon.png")}
          style={{ width: 30, height: 30, borderRadius: 30 / 2 }}
        />
        <View style={[styles.temaContainer, { flexDirection: "column" }]}>
        <Pressable onPress={() => handleConfig(tema, userId)}>
            <Text style={styles.title}>{tema.titulo}</Text>
          </Pressable>
          <Text style={styles.textoTema}>{tema.descripcion}</Text>
        </View>
      </View>
      <ScrollView style={[styles.scrollView, { backgroundColor: "white" }]}>
        {console.log("AVERRR: ",mensajes)}
        <ComponenteMensaje comps={mensajes} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  temaContainer: {
    backgroundColor: "#fdfdfd",
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 30,
  },
  boxContainer: {
    backgroundColor: "#fdfdfd",
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 5,
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: "PoppinsBold",
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
    fontSize: 15,
    lineHeight: 24,
    textAlign: "left",
    color: "black",
    fontFamily: "DroidSans",
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
  plusContainer: {
    backgroundColor: "#4577BB",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fdfdfd",

    color: "#fdfdfd",
  },
});
