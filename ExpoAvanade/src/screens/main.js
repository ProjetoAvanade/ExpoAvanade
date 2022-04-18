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
import PontoProximo from './pontoProximo';

class Main extends Component {

  render() {
    return (
      <View style={styles.main}>
        <StatusBar
          barStyle='dark-content'
          backgroundColor='#F3BC2C'
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
                      source={require('../../assets/img/icon_location.png')}
                    />
                    <Text style={styles.textNav}>Localização</Text>
                  </View>
                )
              }
              if (route.name === 'PontoProximo') {
                return (
                  <View style={styles.iconNav}>
                    <Image
                      style={styles.tabBarIcon2}
                      source={require('../../assets/img/icon_nearby.png')}
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
          <bottomTab.Screen name="PontoProximo" component={PontoProximo} />
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
  iconNav: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  textNav: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'IBMPlexMono_700Bold',
  },
  tabBarIcon: {
    height: 30,
    width: 25.14,
    marginBottom: 5
  },
  tabBarIcon2: {
    height: 30,
    width: 30,
    marginBottom: 5
  }
});
export default Main;