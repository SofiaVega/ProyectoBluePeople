import "react-native-gesture-handler";
import { StyleSheet, SafeAreaView, TextInput, Dimensions } from "react-native";
import ComponenteTemaFila from "./ComponenteTemaFila";
import ComponenteHeader from "./ComponenteHeader";
import { Text, View } from "./Themed";
import { Pressable, useColorScheme } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Topic } from "../interface";
import React, { useEffect, useState, useContext } from "react";
import registerForPushNot from "../app/registerForPushNot";
import { Feather } from "@expo/vector-icons";
import AuthContext from "./context";
import { useIsFocused } from "@react-navigation/native";
import ngrok_url from "../constants/serverlink";
import { Link, Tabs } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

const parseUserData = (user: Topic) => {
  const { titulo, descripcion, id, cod } = user;
  return {
    titulo: titulo,
    descripcion: descripcion,
    id: id,
    cod : cod
  };
};

export default function PaginaPrincipalScreen() {
  const [state, setState] = useState<Topic[]>([]);
  const [isLoading, setLoading] = useState(true);
  const authContext = useContext(AuthContext);
  const user_id = authContext.userId;
  const is_admin = authContext.is_admin;
  const isFocused = useIsFocused();
  console.log("USEISFOCUSED", isFocused);

  console.log("USER LOGGED IN: ", user_id);
  console.log("USER IS ADMIN: ", is_admin);
  const topics_request = is_admin ? "/api/topic" : "/api/subscriptions";
  useEffect(() => {
    const api = async () => {
      try {
        const data = await fetch(ngrok_url + topics_request, {
          method: "GET",
          headers: {
            "x-user-id": user_id,
            "Content-Type": "application/json",
          },
        });
        if (!data.ok) {
          if (data.status === 401) {
            console.log("No topics found!");
            setLoading(false);
            return setState([]);
          }
          console.error(
            `API responded with status ${data.status}: ${data.statusText}`
          );
        }

        const jsonData = await data.json();
        const topics = jsonData.map(parseUserData);
        setLoading(false);
        return setState([...topics]);
        // return setState(jsonData.results);
      } catch (e) {
        console.error(e);
      }
    };
    if (isFocused) {
      console.log("rendering homescreen...");
      api();
    }
  }, [isFocused]);

  console.log("ESTADPPP", state);

  useEffect(() => {
    registerForPushNot();
  }, []);
  const navigation = useNavigation();

  const goToScanner = () => {
    if (is_admin) {
      console.log("going to create theme screen with", user_id);
      navigation.navigate("themeGenerate", { user_id });
    } else {
      navigation.navigate("nuevoTema", { user_id });
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#E8F1F2",
        flex: 1,
      }}
    >
      <ComponenteHeader></ComponenteHeader>
      <View
        style={[
          {
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#E8F1F2",
          },
        ]}
      >
        <View style={[{ flexDirection: "row", backgroundColor: "#E8F1F2" }]}>
          <View
            style={[
              { flexDirection: "row", backgroundColor: "#fdfdfd" },
              styles.input,
            ]}
          >
            <Feather
              name="search"
              size={20}
              color="black"
              style={{ marginLeft: 1, marginRight: 4 }}
            />
            <TextInput placeholder="Buscar" />
          </View>
          <Pressable
            onPress={() => {
              goToScanner();
            }}
            style={styles.plusContainer}
          >
            {({ pressed }) => (
              <FontAwesome
                name="plus"
                size={15}
                color="#fdfdfd"
                style={[{ opacity: pressed ? 0.5 : 1 }]}
              />
            )}
          </Pressable>
        </View>
      </View>
      <View style={[styles.temaContainer]}>
        <View
          style={[
            {
              marginLeft: 20,
              marginTop: 20,
              marginRight: 20,
              backgroundColor: "#fdfdfd",
            },
          ]}
        >
          {is_admin ? (
            <Text style={styles.title}>Admin</Text>
          ) : (
            <Text style={styles.title}>Temas</Text>
          )}
          {state.length ? (
            <ComponenteTemaFila
              comps={state}
              userId={user_id}
              isAdmin={is_admin}
            />
          ) : (
            <Text>No estás suscrito a ningún tema</Text>
          )}
          {isLoading ? <Text>Loading...</Text> : <></>}
        </View>
      </View>
    </SafeAreaView>
  );
}
const screen = Dimensions.get("screen");
const styles = StyleSheet.create({
  temaContainer: {
    backgroundColor: "#fdfdfd",
    borderRadius: 20,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 30,
    marginBottom: 30,
    // height: screen.width * 0.9,
    width: screen.width * 0.9,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "rgba(69,119,187,0.15)",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(69,119,187,0.15)",
    fontSize: 15,
    color: "black",
    marginRight: 10,
    marginLeft: 20,
    marginTop: 30,
  },
  plusContainer: {
    backgroundColor: "#4577BB",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fdfdfd",
    fontSize: 10,
    color: "#fdfdfd",
    marginTop: 30,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
    paddingLeft: 10,
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
