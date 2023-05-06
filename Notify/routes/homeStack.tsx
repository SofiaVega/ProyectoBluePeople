import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import temas from '../app/temas';
import tema from '../app/tema';

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Temas" component={temas} />
      <HomeStack.Screen name="Tema" component={tema} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;