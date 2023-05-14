import { StyleSheet, Button, Switch, Image, SafeAreaView, ScrollView, Pressable, TextInput, Linking } from 'react-native';
import { Feather } from "@expo/vector-icons";
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import ComponenteTemaConfig from '../components/ComponenteTemaConfig';
import { color } from '@rneui/themed/dist/config';
import ComponenteHeader from "../components/ComponenteHeader";
import { Link, Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from 'expo-font';

type Tema = {
  titulo: string;
  descripcion: string;
};

export default function ConfigTemaAdminScreen() {
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
  return (
    <SafeAreaView style={{ backgroundColor: "#E8F1F2" }}>
      <ComponenteHeader></ComponenteHeader>
      <View style={{ marginLeft: 20, marginTop: 20, marginRight: 20, borderRadius: 20, backgroundColor: "#fdfdfd" }}>
        <View style={[styles.temaContainer, { flexDirection: "column" }]}>
          <View style={[{ backgroundColor: '#fdfdfd', flexDirection: "column", alignItems: 'center' }]}>
            <Image source={require('./../assets/images/favicon.png')} style={{ width: 50, height: 50, borderRadius: 30 / 2, marginBottom: 30, marginTop: 40 }} />
          </View>
          <View style={[styles.temaContainerInputs]}>
            <Text style={[styles.titleInput]}>Titulo</Text>
            <TextInput style={[styles.input]} placeholder="Titulo" placeholderTextColor={'rgba(0,0,0,0.10)'} />
          </View>
          <View style={[styles.temaContainerInputs]}>
            <Text style={[styles.titleInput]}>Descripcion</Text>
            <TextInput style={[styles.input]} placeholder="Descripcion" placeholderTextColor={'rgba(0,0,0,0.10)'} />
          </View>
          <View style={[{ backgroundColor: '#fdfdfd', flexDirection: "column", alignItems: 'center' }]}>

            <Link href="/QRGenerate" asChild >
              <Pressable style={[styles.buttonContainer, { backgroundColor: "#DB8A74", marginBottom: 30 }]}><Text style={styles.textoButton}>Genrar QR</Text></Pressable>
            </Link>
            {/* <Link href="/QRGenerate" asChild>
                <Pressable style={[styles.button, {backgroundColor: "#DB8A74", marginBottom: 30}]}>
                  {({ pressed }) => (<Text style={styles.textoButton}>Genrar QR</Text>)}
                </Pressable>
              </Link> */}
            <Pressable style={[styles.buttonContainer, { backgroundColor: "#DB8A74", marginBottom: 30 }]}><Text style={styles.textoButton}>Generar QR</Text></Pressable>
            <Pressable style={styles.buttonContainer}><Text style={styles.textoButton}>Guardar</Text></Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: '#fdfdfd'
  },
  temaContainer: {
    backgroundColor: '#fdfdfd',
    borderRadius: 10,
    marginLeft: 10
  },
  temaContainerInputs: {
    backgroundColor: '#fdfdfd',
    borderRadius: 10,
    padding: 10
  },
  titleInput: {
    fontSize: 18,
    fontWeight: "500",
    paddingLeft: 10,
    color: 'black',
    fontFamily: "PoppinsMedium"
  },
  input: {
    backgroundColor: '#fdfdfd',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.10)',
    fontSize: 15,
    color: 'black',
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 20
  },
  button: {
    backgroundColor: '#EF3E36',
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fdfdfd',
    fontSize: 10,
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fdfdfd',
  },
  buttonContainer: {
    backgroundColor: '#EF3E36',
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fdfdfd',
    fontSize: 10,
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fdfdfd',
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
    color: 'black'
  },
  getStartedContainer: {
    alignItems: 'center',
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
    textAlign: 'center',
    color: '#272727',
    paddingLeft: 10,
  },
  textoButton: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: 'center',
    color: '#fdfdfd',
    fontWeight: 'bold',
    fontFamily: "PoppinsSemiBold"
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

