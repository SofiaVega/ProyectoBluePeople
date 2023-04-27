import React from 'react';
import { StyleSheet, Image,SafeAreaView, ScrollView } from 'react-native';

import Colors from '../constants/Colors';
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import ComponenteTemaFila from './ComponenteTemaFila';

type Tema = {
    titulo: string;
    descripcion: string;
};

export default function ComponenteHeader() {
  return (
    <SafeAreaView style={styles.temaContainer}>
      <View style={[styles.header, {flexDirection: "row", alignItems: 'center',}]}>
        <Image source={require('./../assets/images/Union.png')} style={{width: 30, height: 30, borderRadius: 30/ 2}}/>
        <Text style={[styles.header.header_text, {flexDirection: "column",}]}>Notify</Text>  
      </View>  
      

    </SafeAreaView>
);
}

const styles = StyleSheet.create({
  temaContainer: {
    backgroundColor:'white',
    borderRadius: 10,
  },
  header:{
    backgroundColor: '#4577BB',
    color: '#E8F1F2',
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    paddingVertical: 10,
    header_text: {
      fontSize: 2,
      fontWeight: '600'
    }
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
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
    textAlign: 'center',
    color: 'black'
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
  }
});
