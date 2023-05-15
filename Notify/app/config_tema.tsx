import { StyleSheet, SafeAreaView } from "react-native";
import ComponenteTemaConfig from "../components/ComponenteTemaConfig";

export default function ConfigTemaScreen({ route }) {
  const { tema, userId } = route.params;
  return (
    <SafeAreaView style={{ backgroundColor: "#E8F1F2" }}>
      <ComponenteTemaConfig tema={tema} userId={userId}></ComponenteTemaConfig>
    </SafeAreaView>
  );
}
