import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';

import MapView, { Callout, Marker } from 'react-native-maps';

import api from '../services/api';
import Perfil from '../screens/perfil';
import Ponto from '../screens/ponto';


import AsyncStorage from '@react-native-async-storage/async-storage';
import { backgroundColor, borderBottomColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default class Ponto1 extends Component {

  render() {
    return (
      <View style={styles.main}>
        <StatusBar
          barStyle='dark-content'
          backgroundColor='#FFFFFF'
          hidden={false}
        />

        <View style={styles.mainGap}></View>
        <View style={styles.mainHeader}>
          <View style={styles.mainHeaderSpace}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image source={require('../../assets/img/icon_back.png')} style={styles.mainHeaderImage} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.mainContentHeader}>
            <Text style={styles.mainContentTitle}>Carrefour Limão</Text>
          </View>
          <View style={styles.mainContentTextSpace}>
            <Text style={styles.mainContentText}>Endereço: </Text>
            <Text style={styles.mainContentText1}>Av. Otaviano A. Lima, 2888 - Freguesia do Ó, São Paulo - SP, 02701-000</Text>
            <Text style={styles.mainContentText}>Horário:</Text>
            <Text style={styles.mainContentText1}>00:00 - 23:59</Text>
            <Text style={styles.mainContentText}>Vagas:</Text>
            <Text style={styles.mainContentText1}>Disponiveis = 7 Totais = 15</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.mainContentButton} onPress={() => this.props.navigation.navigate('TutorialTrava')}>
              <Text style={styles.mainContentButtonText}>Estou no ponto</Text>
            </TouchableOpacity>
          </View>

        </View >
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  mainGap: {
    // height: 37,
    height: '4.3%',

  },
  mainHeader: {
    width: '100%',
    // height: 65,
    height: 232,
    backgroundColor: '#ffffff',
    // justifyContent: 'center',
  },
  mainHeaderSpace: {
    width: '63%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // marginLeft: 18,
    marginLeft: '4.7%',
    marginTop: '2%'
  },
  mainHeaderImage: {
    width: 25,
    height: 21.56,
  },
  mainHeaderText: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 25,
  },
  mainContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  mainContentHeader: {
    width: '100%',
    height: 80,
    backgroundColor: '#F3BC2C',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainContentTitle: {
    fontSize: 25,
    fontFamily: 'IBMPlexMono_700Bold',
  },
  mainContentText: {
    fontSize: 20,
    fontFamily: 'ABeeZee_400Regular',
    // marginTop: 40,
  },
  mainContentText1: {
    fontSize: 20,
    fontFamily: 'ABeeZee_400Regular',
    color: '#797979',
    marginBottom: 40
  },
  mainContentTextSpace: {
    width: '80%',
    height: '47%',
    // alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  mainContentButton: {
    height: 60,
    width: 150,
    backgroundColor: '#F3BC2C',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainContentButtonText: {
    fontSize: 20,
    fontFamily: 'IBMPlexMono_700Bold',
    textAlign: 'center'
  }
});
