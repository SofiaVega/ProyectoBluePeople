import React from 'react';
import { StyleSheet, Image, Text } from 'react-native';

import Colors from '../constants/Colors';
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { View } from './Themed';
import { useFonts } from "expo-font";

type TemaFila = {
  titulo: string;
  ultimaNotif: string;
  sinLeer: number;
};

export default function ComponenteMensaje({ comps }) {
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
  console.log("TOOOPPPPPSPCUBV: ",comps)

  return (
    <View style={styles.temaContainer}>
      {comps.map((topic) => (
        <View style={[styles.temaContainer, styles.lineStyle, { flexDirection: "row", alignItems: 'center', }]}>
          <View style={[styles.temaMensaje, { flexDirection: "column", flex: 1 }]}>
            <Text style={styles.textoTema} key={topic.id}>{topic.mensaje}</Text>
          </View>
          {topic.push_enabled ? (
            <View style={[styles.temaMensaje, { flexDirection: "column", flex: 1 }]}>
              <Text style={styles.textoTema} key={topic.id}>{topic.mensaje}</Text>
            </View>
          ) : (
            <View style={[styles.temaContainer, { flexDirection: "column", flex: 1 }]}>
              <Text style={styles.textoTema} key={topic.id}>{topic.mensaje}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  temaContainer: {
    backgroundColor: '#fdfdfd',
    paddingVertical: 12,
    marginRight: 10
  },
  temaMensaje: {
    backgroundColor: "rgba(69,119,187,0.15)",
    paddingVertical: 18,
    borderRadius: 10,
    paddingLeft: 10,
    marginRight: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  lineStyle: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(219, 138, 116, 0.66)',
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
    color: 'black',
    fontFamily: 'DroidSans'
  },
  tituloNotificacion: {
    fontSize: 17,
    color: 'black',
    fontWeight: '600'
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
