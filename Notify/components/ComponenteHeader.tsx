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
  const user_id = authContext.userId;
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
    // <SafeAreaView style={styles.temaContainer}>
      <SafeAreaView
        style={[styles.header]}>
        <Image
          source={require("./../assets/images/Union.png")}
          style={{ width: 50, height: 40, marginRight: 10 }}
        />
        <Text style={[styles.headerText]}>Notify</Text>
        {user_id ?(
          <Pressable style={styles.headerButtonContainer} onPress={logout}>
            <Text style={styles.textoButton}>Salir</Text>
          </Pressable>
        ) : (
          <></>
        )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  temaContainer: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  header:
  {
    width: "100%",
    // height: "60",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4577BB",
    paddingVertical: 15,
  },

  headerButtonContainer:{
    position: "absolute",
    right: 16,
    padding: 5,
    borderRadius: 20,
    fontSize: 10,
    width: "20%",
    color: "#fdfdfd",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "600",
    color: "white",
    // marginLeft: 10,
    // letterSpacing: 1
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
    fontSize: 18,
    lineHeight: 24,
    textAlign: "center",
    color: "#fdfdfd",
    fontWeight: "bold",
  },
});
