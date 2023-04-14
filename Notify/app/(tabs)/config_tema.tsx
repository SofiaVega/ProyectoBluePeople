import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

export default function ConfigTemaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuraciones Tema</Text>
      <View style={styles.separator} lightColor="#E8F1F2" darkColor="#E8F1F2" />
      <EditScreenInfo path="app/(tabs)/config_tema.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
