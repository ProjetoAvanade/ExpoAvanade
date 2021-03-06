import { StatusBar } from 'expo-status-bar';
import React, { Component, useRef } from 'react';

import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/login';
import Cadastro from './src/screens/cadastro';
import Main from './src/screens/main';
import Pesquisa from './src/screens/pesquisa';
import TrocaRodas from './src/screens/trocaRodas';
import Perfil from './src/screens/perfil';
import Cartao from './src/screens/cartao';
import Vaga from './src/screens/vaga';
import Relogio from './src/screens/relogio';
import ModalPagamento from './src/components/modalPagamento';

const AuthStack = createStackNavigator();
import {
  ABeeZee_400Regular,
  ABeeZee_400Regular_Italic
} from '@expo-google-fonts/abeezee';
import { 
  Poppins_700Bold,
  Poppins_400Regular
} from '@expo-google-fonts/poppins';

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {
  let [fontsLoaded, error] = useFonts({
    ABeeZee_400Regular,
    ABeeZee_400Regular_Italic,
    Poppins_700Bold,
    Poppins_400Regular
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <NavigationContainer>
      <StatusBar
        hidden={true}
      />
      <AuthStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Main" component={Main} />
        <AuthStack.Screen name="Pesquisa" component={Pesquisa} />
        <AuthStack.Screen name="Cadastro" component={Cadastro} />
        <AuthStack.Screen name="TrocaRodas" component={TrocaRodas} />
        <AuthStack.Screen name="Perfil" component={Perfil} />
        <AuthStack.Screen name="Vaga" component={Vaga} />
        <AuthStack.Screen name="Relogio" component={Relogio} />
        <AuthStack.Screen name="Cartao" component={Cartao} />
        <AuthStack.Screen name="ModalPagamento" component={ModalPagamento} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#3912A9',
  },

  // estilo dos ??cones da tabBar
  tabBarIcon: {
    width: 22,
    height: 22,
  },
});
