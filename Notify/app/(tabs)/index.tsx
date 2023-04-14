import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import ComponenteTemaFila from '../../components/ComponenteTemaFila';
import { Text, View } from '../../components/Themed';

export default function PaginaPrincipalScreen() {
  return (
    
    <View style={styles.temaContainer}>
      <Text style={styles.title}>Pagina principal</Text>
      <ComponenteTemaFila titulo = "Tema" ultimaNotif = 'Ultima notif' sinLeer={2} ></ComponenteTemaFila>
      <ComponenteTemaFila titulo = "Tema2" ultimaNotif = 'Ultima notif' sinLeer={4} ></ComponenteTemaFila>
    </View>
  );
}

const styles = StyleSheet.create({
  temaContainer: {
    backgroundColor:'white',
    borderRadius: 10,
    margin: 50,
    padding: 10
  },
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
