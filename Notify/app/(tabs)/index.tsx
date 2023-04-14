import { StyleSheet } from 'react-native';

import ComponenteTemaFila from '../../components/ComponenteTemaFila';
import { Text, View } from '../../components/Themed';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function PaginaPrincipalScreen() {
  return (
    <View>
      <View style= {[{margin: 30}]}>

      <Link href="/modal_nuevo_tema" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="plus"
                    size={25}
                    color="white"
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>

      </View>
      <View style={styles.temaContainer}>
        <Text style={styles.title}>Temas</Text>
        <ComponenteTemaFila titulo = "Tema" ultimaNotif = 'Ultima notif' sinLeer={2} ></ComponenteTemaFila>
        <ComponenteTemaFila titulo = "Tema2" ultimaNotif = 'Ultima notif' sinLeer={4} ></ComponenteTemaFila>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  temaContainer: {
    backgroundColor:'white',
    borderRadius: 10,
    margin: 40,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
    padding: 50

  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
