import React, { useEffect, useState } from 'react';
import { StyleSheet, Button, Switch, Image,SafeAreaView, ScrollView, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import ComponenteTemaFila from './ComponenteTemaFila';
import ModalDesuscribir from './ModalDesuscribir';
import ngrok_url from "../constants/serverlink";
import { useFonts } from 'expo-font';

type Tema = {
    titulo: string;
    descripcion: string;
};

export default function ComponenteTemaConfig({tema}) {
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
  const [isEnabled, setState] = useState(true);
  useEffect(() => {
    const api = async () => {
      try {
        const data = await fetch(ngrok_url + "/api/pushnot/2", {
          method: "GET",
          headers: {
            "x-user-id": "2",
            "Content-Type": "application/json",
          },
        });
        if (!data.ok) {
          console.error(
            `API responded with status ${data.status}: ${data.statusText}`
          );
        }
        const jsonData = await data.json();
       return setState(jsonData);
        // return setState(jsonData.results);
      } catch (e) {
        console.error(e);
      }
    };
    api();
  }, []);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleSwitch = () => {
    setState(previousState => !previousState);
   
    const requestOptions = {
      method: 'PUT',
      headers: { 
        "x-user-id": "2",
        'Content-Type': 'application/json' },
      body: JSON.stringify({ recibirpushnot : (!isEnabled).toString() })
    };
    fetch(ngrok_url + '/api/editPushNot/2  ', requestOptions)
      .then(response => response.json())
  }
  return (
        <View style={{ marginLeft: 20, marginTop: 20, marginRight: 20, borderRadius: 20, backgroundColor: "#fdfdfd" }}>
          <View style = {[styles.temaContainer, { flexDirection: "column"}]}> 
            <View style= {[styles.temaContainer, {flexDirection: "row", alignItems: 'center',}]}>
                <Image source={require('./../assets/images/favicon.png')} style={{width: 30, height: 30, borderRadius: 30/ 2}}/>

                <View style= {[styles.bgColor, {flexDirection: "column",}]}>
                    <Text
                    style={styles.title}>
                    {tema.titulo}
                    </Text>
                    <Text
                    style={styles.textoTema}>
                    {tema.descripcion}
                    </Text>
                </View>

            </View>
            <View style= {[styles.temaContainer,{flexDirection: "row", alignItems: 'center',}]}>
              <Text
                    style={styles.title}>
                Notificaciones
              </Text>
              
              <Switch
                onValueChange={toggleSwitch}
                value = {isEnabled}
                trackColor= {{true: "#DB8A74", false: "grey" }} 
                style= {[{margin: 20}]}
                ios_backgroundColor="black">
              </Switch>
            </View>
            <View style = {[{backgroundColor:'#fdfdfd', flexDirection: "column",alignItems: 'center'}]}>
              <Pressable style={styles.buttonContainer} onPress={() => setIsModalOpen(!isModalOpen)}><Text style={styles.textoButton}>Dejar de seguir</Text></Pressable>
              <ModalDesuscribir isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
            </View>
            {/* <Button title="Dejar de seguir" onPress={() => setIsModalOpen(!isModalOpen)}></Button> */}
          

        </View>
        </View>
  );
}

const styles = StyleSheet.create({
  bgColor:{
    backgroundColor: '#fdfdfd'
  },
  temaContainer: {
    backgroundColor:'#fdfdfd',
    borderRadius: 10,
    padding: 10
  },
  button: {
    borderRadius: 8,
    padding: 6,
    height: 50,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
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
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
    color: 'black',
    fontFamily: "PoppinsBold"
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
    textAlign: 'left',
    color: '#272727',
    paddingLeft: 10,
    fontFamily: "DroidSans"
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
