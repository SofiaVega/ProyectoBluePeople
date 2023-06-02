import {
  StyleSheet,
  Image,
  SafeAreaView,
  Pressable,
  Alert,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import ComponenteTemaConfig from "../components/ComponenteTemaConfig";
import { color } from "@rneui/themed/dist/config";
import ComponenteHeader from "../components/ComponenteHeader";
import { Link, Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { useState } from "react";
import ngrok_url from "../constants/serverlink";
import { useNavigation } from "@react-navigation/native";

type Tema = {
  titulo: string;
  descripcion: string;
};

export default function ConfigTemaAdminScreen({ route }) {
  const { tema, userId } = route.params;
  const [titulo, setTitulo] = useState(tema.titulo);
  const [descripcion, setDescripcion] = useState(tema.descripcion);
  const navigation = useNavigation();

  const handleConfig = async () => {
    try {
      const data = await fetch(ngrok_url + "/api/topic/" + tema.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": `${userId}`,
        },
        body: JSON.stringify({ titulo, descripcion }),
      });

      if (!data.ok) {
        const message = await data.json();
        console.error(
          `API responded with status ${data.status} in ConfigTemaAdmin ${message.error}`
        );
        Alert.alert(message.error);
        return;
      }
      console.log("Tema editado!");
      navigation.goBack();
    } catch (error) {
      console.log("unu");
      console.error(error);
    }
  };

  const handleQR = () => {
    navigation.navigate("QRGenerate", { tema, userId });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#E8F1F2" }}>
      <ComponenteHeader></ComponenteHeader>
      <View
        style={{
          marginLeft: 20,
          marginTop: 20,
          marginRight: 20,
          borderRadius: 20,
          backgroundColor: "#fdfdfd",
        }}
      >
        <View style={[styles.temaContainer, { flexDirection: "column" }]}>
          <View
            style={[
              {
                backgroundColor: "#fdfdfd",
                flexDirection: "column",
                alignItems: "center",
              },
            ]}
          >
            <Image
              source={require("./../assets/images/favicon.png")}
              style={{
                width: 50,
                height: 50,
                borderRadius: 30 / 2,
                marginBottom: 30,
                marginTop: 40,
              }}
            />
          </View>
          <View style={[styles.temaContainerInputs]}>
            <Text style={[styles.titleInput]}>Título</Text>
            <TextInput
              style={[styles.input]}
              placeholder={tema.titulo}
              placeholderTextColor={"rgba(0,0,0,0.10)"}
              value={titulo}
              onChangeText={setTitulo}
            />
          </View>
          <View style={[styles.temaContainerInputs]}>
            <Text style={[styles.titleInput]}>Descripción</Text>
            <TextInput
              style={[styles.input]}
              placeholder={tema.descripcion}
              placeholderTextColor={"rgba(0,0,0,0.10)"}
              value={descripcion}
              onChangeText={setDescripcion}
            />
          </View>
          <View
            style={[
              {
                backgroundColor: "#fdfdfd",
                flexDirection: "column",
                alignItems: "center",
              },
            ]}
          >
            <Pressable
              style={[
                styles.buttonContainer,
                { backgroundColor: "#DB8A74", marginBottom: 30 },
              ]}
              onPress={handleQR}
            >
              <Text style={styles.textoButton}>Generar QR</Text>
            </Pressable>
            <Pressable style={styles.buttonContainer} onPress={handleConfig}>
              <Text style={styles.textoButton}>Guardar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bgColor: {
    backgroundColor: "#fdfdfd",
  },
  temaContainer: {
    backgroundColor: "#fdfdfd",
    borderRadius: 10,
    marginLeft: 10,
  },
  temaContainerInputs: {
    backgroundColor: "#fdfdfd",
    borderRadius: 10,
    padding: 10,
  },
  titleInput: {
    fontSize: 18,
    fontWeight: "500",
    paddingLeft: 10,
    color: "black",
    fontFamily: "PoppinsMedium",
  },
  input: {
    backgroundColor: "#fdfdfd",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.10)",
    fontSize: 15,
    color: "black",
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#EF3E36",
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fdfdfd",
    fontSize: 10,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    color: "#fdfdfd",
  },
  buttonContainer: {
    backgroundColor: "#EF3E36",
    padding: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fdfdfd",
    fontSize: 10,
    width: "70%",
    alignItems: "center",
    justifyContent: "center",
    color: "#fdfdfd",
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 10,
    color: "black",
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
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    color: "#272727",
    paddingLeft: 10,
  },
  textoButton: {
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    color: "#fdfdfd",
    fontWeight: "bold",
    fontFamily: "PoppinsSemiBold",
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
