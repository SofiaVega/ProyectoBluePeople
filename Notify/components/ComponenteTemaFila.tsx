import React from 'react';
import { StyleSheet, Image } from 'react-native';

import Colors from '../constants/Colors';
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

type TemaFila = {
    titulo: string;
    ultimaNotif: string;
    sinLeer: number;
};

export default function ComponenteTemaFila(tema: TemaFila) {
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
                    {tema.ultimaNotif}
                    </Text>
                </View>
                {tema.sinLeer > 0 &&
                <Text>{tema.sinLeer}</Text>
                }

            </View>

        </View>
  );
}

const styles = StyleSheet.create({
  temaContainer: {
    backgroundColor:'white',
    margin: 50,
    padding: 10,
    height: 200
    
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
