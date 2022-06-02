import React, { Component } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  View,
  Text,
  focused
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const bottomTab = createBottomTabNavigator();

import Mapa from './mapa';
import Perfil from './perfil';
import PontoProximo from './pontoProximo';
//import Carteira from './carteira';


export default function Main(){
    return (
      <View style={styles.main}>
        <StatusBar
          hidden={false}
        />

        <bottomTab.Navigator
          initialRouteName='Mapa'

          screenOptions={({ route }) => ({
            tabBarIcon: () => {
            },

            // React Navigation 6.x
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: '#FFFFFF',
            tabBarInactiveBackgroundColor: '#FFFFFF',
            tabBarStyle: {
              height: '9%',
              borderTopWidth: 0,
            }
          })}
        >
          <bottomTab.Screen name="Mapa" component={Mapa} options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                <Image
                  source={require('../../assets/img/icon_location.png')}
                  resizeMode='contain'
                  style={{
                    width: 30,
                    height: 26,
                    tintColor: focused ? '#F3BC2C' : '#000000'
                  }}
                />
                <Text style={{ color: focused ? '#F3BC2C' : '#000000', fontSize: 12, top: 5, fontFamily: 'ABeeZee_400Regular', width: 100, textAlign: 'center' }}>Mapa</Text>
              </View>
            )
          }} />

          <bottomTab.Screen name="PontoProximo" component={PontoProximo} options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                <Image
                  source={require('../../assets/img/icon_pointsnearby.png')}
                  resizeMode='contain'
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: focused ? '#F3BC2C' : '#000000'
                  }}
                />
                <Text style={{ color: focused ? '#F3BC2C' : '#000000', fontSize: 12, top: 5, fontFamily: 'ABeeZee_400Regular', width: 100, textAlign: 'center' }}>Pontos próximos</Text>
              </View>
            )
          }} />

        </bottomTab.Navigator>

      </View>
    );
  }

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
});