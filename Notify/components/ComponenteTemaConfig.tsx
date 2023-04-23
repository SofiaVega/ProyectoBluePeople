import React from 'react';
import { StyleSheet, Button, Switch, Image,SafeAreaView, ScrollView, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import ComponenteTemaFila from './ComponenteTemaFila';

type Tema = {
    titulo: string;
    descripcion: string;
};

export default function ComponenteTema(tema: Tema) {
  return (
        <View style={{ backgroundColor: "#E8F1F2" }}>
          <View style = {styles.temaContainer}> 
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
                Push notifications
              </Text>
              <Switch style= {[{margin: 20}]}></Switch>
            </View>
            <Pressable style={styles.buttonContainer}><Text style={styles.textoButton}>Dejar de seguir</Text></Pressable>
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
  buttonContainer: {
    backgroundColor: '#EF3E36',
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fdfdfd',
    fontSize: 10,
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
    fontWeight: 'bold'
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
