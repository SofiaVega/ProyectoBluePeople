import React from "react";
import { StyleSheet, Image, ScrollView } from "react-native";
import { Link, Tabs } from "expo-router";
import Colors from "../constants/Colors";
import { ExternalLink } from "./ExternalLink";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";

type TemaFila = {
  titulo: string;
  ultimaNotif: string;
  sinLeer: number;
};

export default function ComponenteTemaFila({ comps }) {
  console.log("TOPICSSS ", comps);
  return (
    <ScrollView style={styles.temaContainer}>
      {comps.map((topic) => (
        <View
          style={[
            styles.temaContainer,
            styles.lineStyle,
            { flexDirection: "row", alignItems: "center" },
          ]}
          key={topic.id}
        >
          <View style={[styles.temaContainer, { flexDirection: "column" }]}>
            {/* <Link href="/config_tema_admin" asChild > */}
            <Text style={styles.title}>{topic.titulo}</Text>
            {/* </Link> */}
            {/* <Text style={styles.textoTema}>{topic.titulo}</Text> */}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  temaContainer: {
    backgroundColor: "#fdfdfd",
    padding: 10,
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
  lineStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(219, 138, 116, 0.66)",
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
