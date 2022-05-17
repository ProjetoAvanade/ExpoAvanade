import { StatusBar } from 'expo-status-bar';
import React, { Component, useRef } from 'react';

import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/screens/login';
import Cadastro from './src/screens/cadastro';
import Main from './src/screens/main';
import TrocaRodas from './src/screens/trocaRodas';
import Perfil from './src/screens/perfil';
import Cartao from './src/screens/cartao';
import CadastrarReserva from './src/screens/cadastrarReserva';
import Vaga from './src/screens/vaga';
import Relogio from './src/screens/relogio';
import TesteRelogio from './src/screens/testeRelogio';

const AuthStack = createStackNavigator();

import {
  ABeeZee_400Regular,
  ABeeZee_400Regular_Italic
} from '@expo-google-fonts/abeezee';
import { 
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {
  let [fontsLoaded, error] = useFonts({
    ABeeZee_400Regular,
    ABeeZee_400Regular_Italic,
    Poppins_700Bold,
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
        <AuthStack.Screen name="Cadastro" component={Cadastro} />
        <AuthStack.Screen name="TrocaRodas" component={TrocaRodas} />
        <AuthStack.Screen name="Perfil" component={Perfil} />
        <AuthStack.Screen name="Cartao" component={Cartao} />
        <AuthStack.Screen name="CadastrarReserva" component={CadastrarReserva} />
        <AuthStack.Screen name="Vaga" component={Vaga} />
        <AuthStack.Screen name="Relogio" component={Relogio} />
        <AuthStack.Screen name="TesteRelogio" component={TesteRelogio} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#3912A9',
  },

  // estilo dos ícones da tabBar
  tabBarIcon: {
    width: 22,
    height: 22,
  },
});
