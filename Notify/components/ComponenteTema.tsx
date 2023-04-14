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

export default function ComponenteTema(tema: Tema) {
  return (
        <View style={styles.temaContainer}>
            <View style= {[styles.temaContainer, {flexDirection: "row", alignItems: 'center',}]}>
                <Image source={require('./../assets/images/favicon.png')} style={{width: 30, height: 30, borderRadius: 30/ 2}}/>

                <View style= {[styles.temaContainer, {flexDirection: "column",}]}>
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
            <ScrollView style={[styles.scrollView, {backgroundColor: 'white'}] }>
              <ComponenteTemaFila titulo= "Titulo" />
              <ComponenteTemaFila titulo= "Titulo" />
              <ComponenteTemaFila titulo= "Titulo" />
              <ComponenteTemaFila titulo= "Titulo" />
              <ComponenteTemaFila titulo= "Titulo" />
              <ComponenteTemaFila titulo= "Titulo" />
              <ComponenteTemaFila titulo= "Titulo" />
              <ComponenteTemaFila titulo= "Titulo" />
            </ScrollView>
          

        </View>
  );
}

const styles = StyleSheet.create({
  temaContainer: {
    backgroundColor:'white',
    borderRadius: 10,
    margin: 10,
    padding: 10
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
  },
});