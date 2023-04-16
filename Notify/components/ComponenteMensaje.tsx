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

export default function ComponenteMensaje({comps}) {
  console.log("TOPICSSS ", comps)
  return (
        <View style={styles.temaContainer}>
          {comps.map((topic) => (
            <View style= {[styles.temaContainer, styles.lineStyle, {flexDirection: "row", alignItems: 'center',}]}>

                <View style= {[styles.temaContainer, {flexDirection: "column",}]}>
                  
                    <Text style={styles.textoTema} key= {topic.id}>
                      {topic.mensaje}
                    </Text>                   

                </View>
                  {/* { tema.sinLeer > 0 && <Text>{tema.sinLeer}</Text> } */}

            </View>
            ))}

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
    borderBottomWidth: 2,
    borderBottomColor:'#DB8A74',
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
