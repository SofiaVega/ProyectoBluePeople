import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ngrok_url from "../constants/serverlink";
import AuthContext from "../components/context";
import { useFonts } from "expo-font";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const authContext = useContext(AuthContext);
  const handleLogin = async () => {
    try {
      const response = await fetch(ngrok_url + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      // const userId = response.data.userId;
      if (response.ok) {
        const data = await response.json();
        const userId = data.id.toString();
        // check admin login
        try {
          const is_admin = data.is_admin;
          authContext.register_admin(is_admin);
          console.log("ADMIN LOGIN is : ", is_admin);
        } catch {
          console.log("Error checking Admin");
        }
        console.log("LOGGED IN USER: ", userId);
        await AsyncStorage.setItem("userId", userId);
        authContext.register(userId);
      } else {
        console.error(response.json);
        throw new Error("Registration failed");
      }
    } catch (error) {
      Alert.alert("Error", "Falló el registro. Por favor intenta de nuevo.");
    }
  };

  const [fontsLoaded] = useFonts({
    PoppinsBlack: require("../assets/fonts/Poppins-Black.ttf"),
    PoppinsBlackItalic: require("../assets/fonts/Poppins-BlackItalic.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsBoldItalic: require("../assets/fonts/Poppins-BoldItalic.ttf"),
    PoppinsExtraBold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    PoppinsExtraBoldItalic: require("../assets/fonts/Poppins-ExtraBoldItalic.ttf"),
    PoppinsExtraLight: require("../assets/fonts/Poppins-ExtraLight.ttf"),
    PoppinsExtraLightItalic: require("../assets/fonts/Poppins-ExtraLightItalic.ttf"),
    PoppinsItalic: require("../assets/fonts/Poppins-Italic.ttf"),
    PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
    PoppinsLightItalic: require("../assets/fonts/Poppins-LightItalic.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsMediumItalic: require("../assets/fonts/Poppins-MediumItalic.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsSemiBoldItalic: require("../assets/fonts/Poppins-SemiBoldItalic.ttf"),
    PoppinsThin: require("../assets/fonts/Poppins-Thin.ttf"),
    PoppinsThinItalic: require("../assets/fonts/Poppins-ThinItalic.ttf"),
    DroidSans: require("../assets/fonts/DroidSans.ttf"),
    DroidSansBold: require("../assets/fonts/DroidSans-Bold.ttf"),
  });

  return (
    <View
      style={{
        marginLeft: 20,
        marginTop: 20,
        marginRight: 20,
        borderRadius: 20,
        backgroundColor: "#fdfdfd",
        padding: 20,
      }}
    >
      <Image
        source={require("./../assets/images/logoAzul.png")}
        style={styles.logo}
      />

      <Text style={styles.notify}>Notify</Text>

      <Text style={styles.titleInput}>Ingresa tu correo electrónico:</Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="grey"
        value={email}
        style={styles.input}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Pressable onPress={handleLogin} style={styles.buttonContainer}>
        <Text style={styles.textoButton}>Iniciar Sesión</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#DB8A74",
    padding: 15,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#fdfdfd",
    fontSize: 10,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    color: "#fdfdfd",
    alignSelf: "center",
  },
  textoButton: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    color: "#fdfdfd",
    fontWeight: "bold",
    fontFamily: "PoppinsSemiBold",
  },
  input: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 10,
    height: 40,
    margin: 12,
    borderColor: "grey",
    fontFamily: "PoppinsLight",
    color: "black",
  },
  logo: {
    width: 120,
    height: 100,
    alignSelf: "center",
  },
  notify: {
    color: "#4577BB",
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: "PoppinsBold",
    padding: 10,
    alignSelf: "center",
  },
  titleInput: {
    fontFamily: "PoppinsRegular",
    paddingTop: 10,
    padding: 5,
    paddingStart: 15,
  },
});

export default LoginScreen;
