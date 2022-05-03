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
import Carteira from './carteira';


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
            },

            // React Navigation 6.x
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: '#FFFFFF',
            tabBarInactiveBackgroundColor: '#FFFFFF',
            tabBarStyle: {
              height: 78,
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
                <Text style={{
                  color: focused ? '#F3BC2C' : '#000000', fontSize: 12, top: 10, fontFamily: 'ABeeZee_400Regular'
                }}>Mapa</Text>
              </View>
            )
          }} />
          <bottomTab.Screen name="Carteira" component={Carteira} options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                <Image
                  source={require('../../assets/img/icon_wallet.png')}
                  resizeMode='contain'
                  style={{
                    width: 30,
                    height: 26,
                    tintColor: focused ? '#F3BC2C' : '#000000'
                  }}
                />
                <Text style={{
                  color: focused ? '#F3BC2C' : '#000000', fontSize: 12, top: 10, fontFamily: 'ABeeZee_400Regular'
                }}>Carteira digital</Text>
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
                <Text style={{ color: focused ? '#F3BC2C' : '#000000', fontSize: 12, top: 10, fontFamily: 'ABeeZee_400Regular' }}>Pontos próximos</Text>
              </View>
            )
          }} />

        </bottomTab.Navigator>

      </View>
    );
  }

};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  // iconNav: {
  //   flexDirection: 'column',
  //   alignItems: 'center',
  // },
  // textNav: {
  //   fontSize: 12,
  //   color: '#000',
  //   fontFamily: 'IBMPlexMono_700Bold',
  // },
  // tabBarIcon: {
  //   height: 30,
  //   width: 25.14,
  //   marginBottom: 5
  // },
  // tabBarIcon2: {
  //   height: 26.25,
  //   width: 30,
  //   marginBottom: 7
  // },
  // tabBarIcon3: {
  //   height: 30,
  //   width: 30,
  //   marginBottom: 5
  // }
});
export default Main;