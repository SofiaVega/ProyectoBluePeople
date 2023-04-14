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

                <View style= {[styles.temaContainer, {flexDirection: "column",}]}>
                    <Text style={styles.title}>
                      {tema.titulo}
                    </Text>

                    <Text style={styles.textoTema}>
                      Descripcion Mensaje
                    </Text>

                </View>
                  { tema.sinLeer > 0 && <Text>{tema.sinLeer}</Text> }

            </View>
            <View style = {styles.lineStyle} />

        </View>
  );
}

const styles = StyleSheet.create({
  temaContainer: {
    backgroundColor:'white',
    margin: 10,
    padding: 10,
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
  lineStyle:{
    borderWidth: 0.1,
    borderColor:'#DB8A74',
    margin:1,
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
