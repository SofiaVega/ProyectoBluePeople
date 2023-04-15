import { StyleSheet, SafeAreaView } from 'react-native';
import ComponenteTema from '../components/ComponenteTema';

import EditScreenInfo from '../components/ComponenteTema';
import { Text, View } from '../components/Themed';

export default function TemaScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ComponenteTema titulo= "Titulo Notificacion" descripcion='Descripcion del tema'/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  temaContainer: {
    backgroundColor:'white',
    borderRadius: 10,
    margin: 10,
    padding: 10
  },
  container: {
    flex: 1,
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
