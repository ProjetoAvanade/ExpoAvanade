import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  StatusBar
} from 'react-native';

import MapView, { Callout, Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import api from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { backgroundColor, borderBottomColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import TesteModal from '../components/modalLocalizacao';

export default class Mapa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaBicicletarios: [],
      idBicicletario: '',
      erroMessagem: '',
      latitude: null,
      longitude: null,
    };
  }

  buscarBicicletarios = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const resposta = await api.get('/Bicicletario', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      const dadosDaApi = resposta.data;
      this.setState({ listaBicicletarios: dadosDaApi });
      //console.warn(dadosDaApi) 
    } catch (error) {
      //console.warn(error);
    }
  };

  buscarLocalizacao = async () => {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        erroMessagem: 'Permissão para acessar a localização negada!',
      })
      return;
    }
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      this.setState({
        erroMessagem: 'Permissão para acessar a localização negada!',
      })
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    this.setState({ longitude: parseFloat(location.coords.longitude), latitude: parseFloat(location.coords.latitude) });
    //console.warn(this.state.longitude, this.state.latitude);
  };

  componentDidMount() {
    this.buscarBicicletarios();
    this.buscarLocalizacao();
  }

  render() {
    return (
      <View style={styles.main}>
        <StatusBar
          barStyle='dark-content'
          backgroundColor='#F3BC2C'
          hidden={false}
        />
        <TesteModal />
        <View style={styles.mainGap}></View>
        <View style={styles.mainHeader}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Perfil')}>
            <View style={styles.mainHeaderSpace}>
              <Image source={require('../../assets/img/profile.png')} style={styles.mainHeaderProfile} />
              <View>
                <Text style={styles.mainHeaderText}>Olá,</Text>
                <Text style={styles.mainHeaderText}>Rosana Dolores</Text>
              </View>
              <Image source={require('../../assets/img/icon_next.png')} style={styles.mainHeaderNext} />
            </View>
          </TouchableOpacity>
        </View>

        <MapView style={styles.mainMap}
          showsUserLocation
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.030,
            longitudeDelta: 0.050,
            //latitudeDelta: 0.014,
            //longitudeDelta: 0.014, 
          }}>
          {this.state.listaBicicletarios.map((item) => {
            return (
              <Marker
                key={item.idBicicletario}
                coordinate={{
                  latitude: parseFloat(item.latitude),
                  longitude: parseFloat(item.longitude),
                }}
                title={item.nomeBicicletario}
                description={item.rua}
              >
                <Callout onPress={() => this.props.navigation.navigate('Ponto', { id: item })}>
                  <Text style={styles.calloutText}>{item.nome}</Text>
                  <Text style={styles.calloutText}>Rua {item.rua}, {item.numero}</Text>
                </Callout>
              </Marker>
            );
          })}
        </MapView>

        <View style={styles.mainSearch}>
          <View style={styles.mainSearchInput}>
            <TouchableOpacity style={styles.mainMenuInput} onPress={() => this.props.navigation.navigate('TrocaPontos')}>
              <Text style={styles.mainBtnText}>Para onde?</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View >
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
    height: '7.6%',
    backgroundColor: '#F3BC2C',
    justifyContent: 'center',
  },
  mainHeaderSpace: {
    width: '59%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // marginLeft: 18,
    marginLeft: '7%',
  },
  mainHeaderProfile: {
    width: 50,
    height: 50,
  },
  mainHeaderText: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 14,
    // marginRight: 30,
  },
  mainHeaderNext: {
    width: 20,
    height: 20,
    marginRight: 30,
    marginTop: 20,
  },
  mainMap: {
    width: '100%',
    height: '79%',
  },
  mainSearch: {
    width: '100%',
    // height: 70,
    height: '9%',
    backgroundColor: '#F3BC2C',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#000000',
    borderBottomWidth: 1

  },
  mainSearchInput: {
    width: '80%',
    // height: 45,
    height: '60%',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    // alignItems: 'center',
    justifyContent: 'center'
  },
  mainSearchInputText: {
    paddingLeft: 20,
    // alignItems: 'center',
    // justifyContent: 'center'
  }
});
