import { StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import ComponenteTema from '../components/ComponenteTema';
import ComponenteHeader from '../components/ComponenteHeader';

import EditScreenInfo from '../components/ComponenteTema';
import { Text, View } from '../components/Themed';

export default function TemaScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ComponenteHeader/>
      <View style={[styles.temaContainer]}>
        <ComponenteTema titulo= "Titulo Notificacion" descripcion='Descripcion del tema'/>
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
    backgroundColor: "#E8F1F2"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
