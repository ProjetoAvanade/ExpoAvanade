import React, { Component } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const bottomTab = createBottomTabNavigator();

import Mapa from './mapa';
import Perfil from './perfil';

class Main extends Component {

  render() {
    return (
      <View style={styles.main}>
        <StatusBar
          hidden={false}
        />

        <bottomTab.Navigator
          initialRouteName='Mapa'

          screenOptions={({ route }) => ({
            tabBarIcon: () => {
              if (route.name === 'Mapa') {
                return (
                  <View style={styles.iconNavegacao}>
                    <Image
                      style={styles.tabBarIcon}
                      source={require('../../assets/img/icon_mapa.png')}
                    />
                    <Text style={styles.textoNavegacao}>Mapa</Text>
                  </View>
                )
              }
              if (route.name === 'Perfil') {
                return (
                  <View style={styles.iconNavegacao}>
                    <Image
                      style={styles.tabBarIcon}
                      source={require('../../assets/img/icon_perfil.png')}
                    />
                    <Text style={styles.textoNavegacao}>Meu Perfil</Text>
                  </View>
                )
              }
            },

            // React Navigation 6.x
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: '#F3BC2C',
            tabBarInactiveBackgroundColor: '#F3BC2C',
            // tabBarActiveTintColor: 'blue',
            // tabBarInactiveTintColor: 'red',
            tabBarStyle: {
              height: 78,
              borderTopWidth: 0,
            }
          })}
        >
          <bottomTab.Screen name="Mapa" component={Mapa} />
          <bottomTab.Screen name="Perfil" component={Perfil} />
        </bottomTab.Navigator>

      </View>
    );
  }

};

const styles = StyleSheet.create({
  // conteúdo da main
  main: {
    flex: 1,
  },

  iconNavegacao: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  // estilo dos textos da navegação
  textoNavegacao: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'IBMPlexMono-Bold',
  },

  // estilo dos ícones da tabBar
  tabBarIcon: {
    width: 40,
    height: 40
  }

});

export default Main;