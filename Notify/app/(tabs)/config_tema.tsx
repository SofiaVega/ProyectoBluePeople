import { StyleSheet, SafeAreaView } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import ComponenteTemaConfig from '../../components/ComponenteTemaConfig';

type Tema = {
  titulo: string;
  descripcion: string;
};

export default function ConfigTemaScreen() {
  return (
    <SafeAreaView >
      <ComponenteTemaConfig titulo = "Titulo" descripcion = "Descripcion"></ComponenteTemaConfig>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  temaContainer: {
    backgroundColor:'#E8F1F2',
    borderRadius: 10,
    margin: 10,
    padding: 10
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',

    color: 'black'
  },
  getStartedContainer: {
    alignItems: 'center',
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
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    color: 'black'
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});

