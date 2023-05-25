import { StyleSheet, SafeAreaView, TextInput } from "react-native";

import ComponenteTemaFila from "../components/ComponenteTemaFila";
import ComponenteHeader from "../components/ComponenteHeader";
import { Text, View } from "../components/Themed";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Topic } from "../interface";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import ngrok_url from "../constants/serverlink";
import AsyncStorage from "@react-native-async-storage/async-storage";



const parseUserData = (user: Topic) => {
  const { titulo, descripcion, id } = user;
  return {
    titulo: titulo,
    descripcion: descripcion,
    id: id,
  };
};

export default function temas() {
  const [state, setState] = useState<Topic[]>([]);

  const [userId, setUserId] = useState<String | null>(null);
  const authContext = {
    userId: userId,
    register: (id) => {
      setUserId(id);
    },
  };
  useEffect(() => {
    //Check if user is logged in using asyncStorage
    async function getUserId() {
      const storedId = await AsyncStorage.getItem("userId");
      console.log(storedId + "storedId");
      setUserId(storedId);
    }
    getUserId();
    console.log(userId);
  }, []);

  useEffect(() => {
    const api = async () => {
      try {
        const data = await fetch(ngrok_url + "/api/subscriptions", {
          method: "GET",
          headers: {
            "x-user-id": `${userId}`,
            "Content-Type": "application/json",
          },
        });
        if (!data.ok) {
          console.error(
            `API responded with status ${data.status}: ${data.statusText}`
          );
        }

        const jsonData = await data.json();
        const topics = jsonData.map(parseUserData);
        return setState([...state, ...topics]);
        // return setState(jsonData.results);
      } catch (e) {
        console.error(e);
      }
    };
    api();
  }, []);

  console.log("ESTADPPP", state);

  return (
    <View>
      {/* Header bar */}
      <ComponenteHeader></ComponenteHeader>
      <View
        style={[
          { marginLeft: 30, marginTop: 30, marginBottom: 20 },
          { backgroundColor: "#E8F1F2" },
        ]}
      >
        <Feather name="search" size={20} color="black" style={{marginLeft: 1, marginRight:1 }}/>
        <TextInput />
        <Link href="/modal_nuevo_tema" asChild>
          <Pressable>
            {({ pressed }) => (
              <FontAwesome
                name="plus"
                size={25}
                color="black"
                style={[
                  { marginRight: 15, opacity: pressed ? 0.5 : 1 },
                  styles.white_background,
                ]}
              />
            )}
          </Pressable>
        </Link>
      </View>
      <View style={styles.temaContainer}>
        <Text style={styles.title}>Temas</Text>
        <ComponenteTemaFila comps={state}></ComponenteTemaFila>
        {/* <ComponenteTemaFila titulo = "Tema2" ultimaNotif = 'Ultima notif' sinLeer={4} ></ComponenteTemaFila> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  temaContainer: {
    backgroundColor: "white",
    borderRadius: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    color: "black",
    paddingLeft: 30,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  white_background: {
    backgroundColor: "white",
  },
});
