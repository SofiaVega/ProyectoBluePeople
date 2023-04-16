import React, {useEffect, useState} from 'react';
import { StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import Colors from '../constants/Colors';
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import ComponenteTemaFila from './ComponenteTemaFila';
import { Topic } from '../interface';
import axios, { AxiosResponse } from 'axios';

type Tema = {
  titulo: string;
  descripcion: string;
};


export default function ComponenteTema(tema: Tema) {
  const [result, setResult] = useState<Topic[]>([]);
  useEffect(() => {
    const api = async() => {
      try{
      const data = await fetch("http://localhost:3000/api/topic", {
        method: "GET",
        headers: {
          'x-user-id': '5',
          'Content-Type': 'application/json',
        }

      });
      if(!data.ok) {
        console.error(`API responded with status ${data.status}: ${data.statusText}`)
      }

      const jsonData = await data.json();
      setResult(jsonData.results);}catch(e) {
        console.error(e)
      }
    };
    api();
  }, []);

  return (
    <SafeAreaView style={styles.temaContainer}>
      <View style={[styles.temaContainer, { flexDirection: "row", alignItems: 'center', }]}>
        <Image source={require('./../assets/images/favicon.png')} style={{ width: 30, height: 30, borderRadius: 30 / 2 }} />

        <View style={[styles.temaContainer, { flexDirection: "column", }]}>
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
      <ScrollView style={[styles.scrollView, { backgroundColor: 'white' }]}>
        <ComponenteTemaFila />
        <ComponenteTemaFila />
        <ComponenteTemaFila />
        <ComponenteTemaFila />
        <ComponenteTemaFila />
        <ComponenteTemaFila />

      </ScrollView>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  temaContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10
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
