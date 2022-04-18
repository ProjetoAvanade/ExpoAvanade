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
              if (route.name === 'Mapa') {
                return (
                  <View style={styles.iconNav}>
                    <Image
                      style={styles.tabBarIcon}
                      source={require('../../assets/img/icon_locationInactive.png')}
                    />
                    <Text style={styles.textNav}>Localização</Text>
                  </View>
                )
              }
              if (route.name === 'Carteira') {
                return (
                  <View style={styles.iconNav}>
                    <Image
                      style={styles.tabBarIcon2}
                      source={require('../../assets/img/icon_walletInactive.png')}
                    />
                    <Text style={styles.textNav}>Carteira</Text>
                  </View>
                )
              }
              if (route.name === 'PontoProximo') {
                return (
                  <View style={styles.iconNav}>
                    <Image
                      style={styles.tabBarIcon3}
                      source={require('../../assets/img/icon_nearbyInactive.png')}
                    />
                    <Text style={styles.textNav}>Pontos próximos</Text>
                  </View>
                )
              }
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
          <bottomTab.Screen name="Mapa" component={Mapa} />
          <bottomTab.Screen name="Carteira" component={Carteira} />
          <bottomTab.Screen name="PontoProximo" component={PontoProximo} />

        </bottomTab.Navigator>

      </View>
    );
  }

};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  iconNav: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  textNav: {
    fontSize: 12,
    color: '#000',
    fontFamily: 'IBMPlexMono_700Bold',
  },
  tabBarIcon: {
    height: 30,
    width: 25.14,
    marginBottom: 5
  },
  tabBarIcon2: {
    height: 26.25,
    width: 30,
    marginBottom: 7
  },
  tabBarIcon3: {
    height: 30,
    width: 30,
    marginBottom: 5
  }
});
export default Main;