import React, { useEffect, useState } from "react";
import { StyleSheet, Image, SafeAreaView, ScrollView } from "react-native";
import { Text, View } from "./Themed";
import { Pressable } from "react-native";
import { MensajesScreen } from "../interface";
import ComponenteMensaje from "./ComponenteMensaje";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

export default function ComponenteTema({ tema }) {
  const [isLoading, setLoading] = useState(true);
  const [mensajes, setMensajes] = useState<MensajesScreen[]>([]);
  console.log("TEMA:", tema);
  useEffect(() => {
    const api = async () => {
      try {
        const data = await fetch(
          `http://localhost:3000/api/topic/${tema.id}/messages`,
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

  const navigation = useNavigation();

  const handleConfig = (tema) => {
    console.log("THEME CONFIG: ", tema);
    navigation.navigate("themeConfig", { tema });
  };

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
          <Text style={styles.title}>{tema.titulo}</Text>
          <Text style={styles.textoTema}>{tema.descripcion}</Text>
        </View>
        <Pressable
          style={styles.plusContainer}
          onPress={() => handleConfig(tema)}
        >
          {({ pressed }) => (
            <FontAwesome
              name="gear"
              size={15}
              color="#fdfdfd"
              style={[{ opacity: pressed ? 0.5 : 1 }]}
            />
          )}
        </Pressable>
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
  plusContainer: {
    backgroundColor: "#4577BB",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fdfdfd",

    color: "#fdfdfd",
  },
});
