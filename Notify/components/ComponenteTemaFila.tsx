import React from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Link, Tabs } from "expo-router";
import Colors from "../constants/Colors";
import { ExternalLink } from "./ExternalLink";
import { MonoText } from "./StyledText";
import { useFonts } from "expo-font";

type TemaFila = {
  titulo: string;
  ultimaNotif: string;
  sinLeer: number;
};

export default function ComponenteTemaFila({ comps }) {
  const navigation = useNavigation();
  console.log("COMPS: ", comps);

  const handleThemePress = (tema) => {
    console.log("THEME: ", tema);
    navigation.navigate("themeInfo", { tema });
  };

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
  console.log("TOPICSSS ", comps);
  return (
    <ScrollView style={styles.temaContainer}>
      {comps.map((topic) => (
        <View
          style={[
            styles.temaContainer,
            styles.lineStyle,
            { flexDirection: "row", alignItems: "center" },
          ]}
          key={topic.id}
        >
          <TouchableOpacity
            onPress={() => {
              handleThemePress(topic);
            }}
          >
            <View style={[styles.temaContainer, { flexDirection: "column" }]}>
              <Text style={styles.title}>{topic.titulo}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  temaContainer: {
    backgroundColor: "#fdfdfd",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    fontFamily: "PoppinsBold",
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  lineStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(219, 138, 116, 0.66)",
    marginBottom: 1,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  textoTema: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
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
});
