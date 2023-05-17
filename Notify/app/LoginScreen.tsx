import React, { useState, useContext } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ngrok_url from "../constants/serverlink";
import AuthContext from "../components/context";

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
        console.log("LOGGED IN USER: ", userId);
        await AsyncStorage.setItem("userId", userId);
        authContext.register(userId);
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      Alert.alert("Error", "Registration failed. Please try again.");
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <Button title="Register" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
