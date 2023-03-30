import { StyleSheet } from 'react-native';
import ComponenteTema from '../../components/ComponenteTema';

import EditScreenInfo from '../../components/ComponenteTema';
import { Text, View } from '../../components/Themed';

export default function TemaScreen() {
  return (
    <View style={styles.container}>
      <ComponenteTema titulo= "Titulo" descripcion='Descripcion del tema'/>
    </View>
  );
}

const styles = StyleSheet.create({
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
