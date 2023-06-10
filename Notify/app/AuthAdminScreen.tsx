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
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

const AuthAdminScreen = () => {
  const navigator = useNavigation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const isAdmin = true;

  const authContext = useContext(AuthContext);
  const handleRegisterAdmin = async () => {
    try {
      const response = await fetch(ngrok_url + "/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name, isAdmin }),
      });
      // const userId = response.data.userId;
      if (response.ok) {
        const data = await response.json();
        const userId = data.id.toString();
        console.log("REGISTERED IN ADMIN USER: ", userId);
        await AsyncStorage.setItem("userId", userId);
        authContext.register(userId);
        try {
          const is_admin = data.is_admin;
          authContext.register_admin(is_admin);
          console.log("ADMIN LOGIN is : ", is_admin);
        } catch {
          console.log("Error checking Admin");
        }
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
        backgroundColor: "#263750",
        padding: 20,
        flex: 1,
      }}
    >
      <View style={{ paddingTop: "20%" }}>
        <Image
          source={require("./../assets/images/Union.png")}
          style={styles.logo}
        />
      </View>

      <Text
        style={{ flexDirection: "row", alignSelf: "center", paddingTop: 20 }}
      >
        <Text style={styles.notify}>Notify </Text>{" "}
        <Text style={styles.admin}>admin</Text>
      </Text>
      <Text style={styles.titleInput}>Ingresa tu correo electrónico:</Text>
      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="grey"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
      />

      <Text style={styles.titleInput}>Nombre:</Text>
      <TextInput
        placeholder="Nombre"
        placeholderTextColor="grey"
        style={styles.input}
        onChangeText={setName}
        value={name}
        autoCapitalize="none"
      />

      <View style={{ paddingTop: 25 }}>
        <Pressable style={styles.buttonContainer} onPress={handleRegisterAdmin}>
          <Text style={styles.textoButton}> Regístrate </Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#4577BB",
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
    borderColor: "#fdfdfd",
    backgroundColor: "#fdfdfd",
    color: "black",
  },
  titleInput: {
    padding: 5,
    paddingStart: 15,
    paddingTop: 40,
    color: "#fdfdfd",
  },
  logo: {
    width: 120,
    height: 100,
    alignSelf: "center",
  },
  notify: {
    color: "#fdfdfd",
    fontWeight: "bold",
    fontSize: 30,
    padding: 10,
    alignSelf: "center",
  },
  admin: {
    color: "#fdfdfd",
    fontSize: 20,
    padding: 10,
    alignSelf: "center",
  },
  linkSesion: {
    textDecorationLine: "underline",
    color: "#f27957",
  },
});

export default AuthAdminScreen;
