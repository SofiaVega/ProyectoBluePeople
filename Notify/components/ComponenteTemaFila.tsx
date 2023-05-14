import React from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

type TemaFila = {
  titulo: string;
  ultimaNotif: string;
  sinLeer: number;
};

export default function ComponenteTemaFila({ comps }) {
  const navigation = useNavigation();
  console.log("COMPS: ", comps);

  const handleThemePress = (tema) => {
    console.log("THEME: ", tema);
    navigation.navigate("themeInfo", { tema });
  };

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
          <TouchableOpacity
            onPress={() => {
              handleThemePress(topic);
            }}
          >
            <View style={[styles.temaContainer, { flexDirection: "column" }]}>
              <Text style={styles.title}>{topic.titulo}</Text>
            </View>
          </TouchableOpacity>
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
