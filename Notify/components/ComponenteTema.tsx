import React, { useEffect, useState } from "react";
import { StyleSheet, Image, SafeAreaView, ScrollView } from "react-native";
import Colors from "../constants/Colors";
import { ExternalLink } from "./ExternalLink";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";
import ComponenteTemaFila from "./ComponenteTemaFila";
import { Topic, MensajesScreen } from "../interface";
import axios, { AxiosResponse } from "axios";
import ComponenteMensaje from "./ComponenteMensaje";
import ngrok_url from "../constants/serverlink";

export default function ComponenteTema({ tema }) {
  const [isLoading, setLoading] = useState(true);
  const [mensajes, setMensajes] = useState<MensajesScreen[]>([]);
  console.log("TEMA:", tema);
  useEffect(() => {
    const api = async () => {
      try {
        const data = await fetch(
          ngrok_url + `/api/topic/${tema.id}/messages`,
          {
            method: "GET",
            headers: {
              "x-user-id": "2",
              "Content-Type": "application/json",
            },
          }
        );
        if (!data.ok) {
          console.error(
            `API responded with status ${data.status}: ${data.json} in ComponenteTema`
          );
        }
        const jsonData: MensajesScreen[] = await data.json();
        console.log("Messages: ", jsonData);
        setMensajes(jsonData);
        setLoading(false);
      } catch (e) {
        console.error("ERROR", e);
      }
    };
    api();
  }, []);

  return isLoading ? (
    <Text>Loading ...</Text>
  ) : (
    <SafeAreaView style={styles.temaContainer}>
      <View
        style={[
          styles.boxContainer,
          { flexDirection: "row", alignItems: "center" },
        ]}
      >
        <Image
          source={require("./../assets/images/favicon.png")}
          style={{ width: 30, height: 30, borderRadius: 30 / 2 }}
        />
        <View style={[styles.temaContainer, { flexDirection: "column" }]}>
          <Text style={styles.title}>{mensajes[0].titulo}</Text>
          <Text style={styles.textoTema}>{tema.descripcion}</Text>
        </View>
      </View>
      <ScrollView style={[styles.scrollView, { backgroundColor: "white" }]}>
        <ComponenteMensaje comps={mensajes} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  temaContainer: {
    backgroundColor: "#fdfdfd",
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 30,
  },
  boxContainer: {
    backgroundColor: "#fdfdfd",
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 5,
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",

    color: "black",
  },
  getStartedContainer: {
    alignItems: "center",
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
    textAlign: "center",
    color: "black",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
});
