import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  Pressable,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ngrok_url from "../constants/serverlink";
import AuthContext from "../components/context";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import ComponenteHeader from "../components/ComponenteHeader";

const RegisterScreen = () => {
  const navigator = useNavigation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const authContext = useContext(AuthContext);

  const handleRegister = async () => {
    try {
      const response = await fetch(ngrok_url + "/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      });
      // const userId = response.data.userId;
      if (response.ok) {
        const data = await response.json();
        const userId = data.id.toString();
        console.log("REGISTERED USER: ", userId);
        await AsyncStorage.setItem("userId", userId);
        authContext.register(userId);
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      Alert.alert("Error", "Falló el registro. Por favor intenta de nuevo.");
    }
  };

  return (
    <View
      style={{
        marginLeft: 20,
        marginTop: "20%",
        marginRight: 20,
        borderRadius: 20,
        backgroundColor: "#fdfdfd",
        padding: 20,
      }}
    >
      <Text style={{ flexDirection: "row", paddingBottom: 20 }}>
        <Text style={styles.title}>Bienvenido a</Text>{" "}
        <Text style={styles.notify}>Notify</Text>
      </Text>

      <Image
        source={require("./../assets/images/logoAzul.png")}
        style={styles.logo}
      />

      <Text style={styles.titleInput}>Ingresa tu correo electrónico:</Text>
      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="grey"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <Text style={styles.titleInput}>Nombre:</Text>
      <TextInput
        placeholder="Nombre"
        placeholderTextColor="grey"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <View style={{ paddingTop: 25 }}>
        <Pressable onPress={handleRegister} style={styles.buttonContainer}>
          <Text style={styles.textoButton}>Regístrate</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => {
          navigator.navigate("login");
        }}
      >
        <Text style={{ flexDirection: "row", paddingTop: 30 }}>
          <Text style={styles.titleInput}>
            ¿Ya tienes una cuenta? Inicia sesión
          </Text>{" "}
          <Text style={styles.linkSesion}>aquí</Text>
        </Text>
      </Pressable>

      <Pressable
        onPress={() => {
          navigator.navigate("admin_register");
        }}
      >
        <Text style={{ flexDirection: "row", paddingTop: 30 }}>
          <Text style={styles.titleInput}>
            ¿Necesitas más poder? Regístrate como administrador
          </Text>{" "}
          <Text style={styles.linkSesion}>aquí</Text>
        </Text>
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
  },
  input: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 10,
    height: 40,
    margin: 12,
    borderColor: "grey",
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
    fontSize: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  titleInput: {
    padding: 5,
    paddingStart: 15,
    paddingTop: 40,
  },
  linkSesion: {
    textDecorationLine: "underline",
    color: "#4577BB",
  },
});

export default RegisterScreen;
