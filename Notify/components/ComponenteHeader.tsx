import React, { useContext } from "react";
import { StyleSheet, Image, SafeAreaView, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../components/context";
import { Text, View } from "./Themed";

type Tema = {
  titulo: string;
  descripcion: string;
};

export default function ComponenteHeader() {
  const authContext = useContext(AuthContext);

  const logout = () => {
    try {
      AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
      console.log("AsyncStorage cleared successfully");
      authContext.register(null);
      authContext.register_admin(false);
    } catch (error) {
      console.log("Error clearing AsyncStorage: ", error);
    }
  };
  return (
    <SafeAreaView style={styles.temaContainer}>
      <View
        style={[
          styles.header,
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Image
          source={require("./../assets/images/Union.png")}
          style={{ width: 50, height: 50, borderRadius: 30 / 2 }}
        />
        <Text style={[styles.headerText]}>Notify</Text>
        <Pressable style={styles.buttonContainer} onPress={logout}>
          <Text style={styles.textoButton}>Salir</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  temaContainer: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  header: {
    backgroundColor: "#4577BB",

    paddingVertical: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "600",
    color: "white",
    marginLeft: 10,
    fontFamily: "poppins",
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
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
  buttonContainer: {
    backgroundColor: "#EF3E36",
    padding: 5,
    borderRadius: 20,
    fontSize: 10,
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    color: "#fdfdfd",
    marginLeft: 100,
  },
  textoButton: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    color: "#fdfdfd",
    fontWeight: "bold",
    fontFamily: "PoppinsSemiBold",
  },
});
