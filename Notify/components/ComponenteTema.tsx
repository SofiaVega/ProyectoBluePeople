import React, {useEffect, useState} from 'react';
import { StyleSheet, Image, SafeAreaView, ScrollView } from 'react-native';
import Colors from '../constants/Colors';
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import ComponenteTemaFila from './ComponenteTemaFila';
import { Topic, MensajesScreen } from '../interface';
import axios, { AxiosResponse } from 'axios';
import ComponenteMensaje from './ComponenteMensaje'
type Tema = {
  titulo: string;
  descripcion: string;
};

const getData = async (endpoint: string) => {
  const response = await fetch(endpoint)
  const data: MensajesScreen = await response.json()
  return data
}

const parseUserData = (user: MensajesScreen) => {
  const { mensajes, id, titulo, descripcion } = user
  return { 
    mensajes: mensajes,
    id: id,
    titulo: titulo,
    descripcion: descripcion
  }
}

export default function ComponenteTema(tema: Tema) {
  const [isLoading, setLoading] = useState(true);
  const [state, setState] = useState<MensajesScreen[]>([]);
  // useEffect(effect: () => {
  //   axios.get<Topic[]>('http://localhost:3000/api/topic').then((response: AxiosResponse) => {
  //     console.log('Response', response.data);
  //   });

  // }, deps: []);
  // useEffect(() => {
  //   const api = async() => {
  //     try{
  //       const data = await fetch("http://localhost:3000/api/topic", {
  //         method: "GET",
  //         headers: {
  //           'x-user-id': '5',
  //           'Content-Type': 'application/json',
  //         }

  //       });
  //       if(!data.ok) {
  //         console.error(`API responded with status ${data.status}: ${data.statusText}`)
  //       }

  //       const jsonData = await data.json();
  //       const topics = jsonData.map(parseUserData)
  //       return setState({...state, topic: [...topics]})
  //     }catch(e) {
  //       console.error(e)
  //     }
  //   };
  //   api();
  // }, []);

  // console.log(state)



  useEffect(() => {
    const api = async() => {
      const id = 302
      try{
        const data = await fetch(`http://localhost:3000/api/topic/${id}/messages`, {
          method: "GET",
          headers: {
            'x-user-id': '5',
            'Content-Type': 'application/json'
          }

        });
        if(!data.ok) {
          console.error(`API responded with status ${data.status}: ${data.statusText}`)
        }

        const jsonData:MensajesScreen[] = await data.json();
        // console.log("DATAAAAAA ", jsonData)
        // const topics = jsonData.map(parseUserData)
        // console.log("TOPICSO", jsonData)

        setState([...state, ...jsonData])
        setLoading(false);
        // return setState(jsonData.results);
      }catch(e) {
          console.error("ERROR", e)
      }
    };
    api();
    // api();
  }, []);

  // console.log("ESTADPPP", state[0])
  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <SafeAreaView style={styles.temaContainer}>
      <View style={[styles.temaContainer, { flexDirection: "row", alignItems: 'center', }]}>
        <Image source={require('./../assets/images/favicon.png')} style={{ width: 30, height: 30, borderRadius: 30 / 2 }} />

        <View style={[styles.temaContainer, { flexDirection: "column", }]}>
          <Text
            style={styles.title}>
            {state[0].titulo}
          </Text>
          <Text
            style={styles.textoTema}>
            {tema.descripcion}
          </Text>
        </View>

      </View>
      <ScrollView style={[styles.scrollView, { backgroundColor: 'white' }]}>
        <ComponenteMensaje comps = {state} />
      </ScrollView>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  temaContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 30
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