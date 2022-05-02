import React, { Component, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
  Modal,
  TouchableHighlight
} from 'react-native';

import MapView, { Callout, Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import api from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Mapa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaBicicletarios: [],
      idBicicletario: '',
      erroMessagem: '',
      latitude: null,
      longitude: null,
      modalVisible: false,
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
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
  buscarInfoPerfil = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const resposta = await api.get('/Usuario', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      if (resposta.status === 200) {
        const dadosDaApi = resposta.data;
        this.setState({
          nomeUsuario: dadosDaApi.nomeUsuario,
          email: dadosDaApi.email,
          pontos: dadosDaApi.pontos,
          saldo: dadosDaApi.saldo,
        });
      }
    } catch (error) {
      //console.warn(resposta)
      //console.warn(error);
    }
  };

  componentDidMount() {
    this.buscarLocalizacao();
    this.buscarBicicletarios();
    this.buscarInfoPerfil();
  }

  render() {
    return (
      <View style={styles.main}>
        <StatusBar
          barStyle='dark-content'
          backgroundColor='#F3BC2C'
          hidden={false}
        />
        {/* <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={styles.modalTime}>
            <Text style={styles.modalTitle}>Confirme o tempo</Text>

            <View>
              <Text style={styles.modalTextTitle}>R$3,75</Text>
              <Text style={styles.modalText}>1 Hora</Text>
              <Text style={styles.modalTextInfo}>Válido até 10:30</Text>
            </View>

            <View>
              <Text style={styles.modalTextTitle}>R$ 6,50</Text>
              <Text style={styles.modalText}>2 Hora</Text>
              <Text style={styles.modalTextInfo}>Válido até 11:30</Text>
            </View>

            <Text style={styles.modalTextInfo}>Saldo: R$0,00</Text>

            <TouchableOpacity style={styles.modalBtn}>
              <Text style={styles.modalTextTitle}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </Modal> */}
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={styles.modalPoint}>
            <View style={styles.modalPointInfo}>
              <Image source={require('../../assets/img/profile.png')} style={styles.modalImage}></Image>
              <Text style={styles.modalText}>Nome do ponto:</Text>
              <Text style={styles.modalTextInfo}>Carrefour Limão</Text>
            </View>

            <View style={styles.modalPointInfo}>
              <Image source={require('../../assets/img/profile.png')} style={styles.modalImage}></Image>
              <Text style={styles.modalText}>Horário:</Text>
              <Text style={styles.modalTextInfo}>00:00 - 23:59</Text>
            </View>

            <View style={styles.modalPointInfo}>
              <Image source={require('../../assets/img/profile.png')} style={styles.modalImage}></Image>
              <Text style={styles.modalText}>Vagas:</Text>
              <Text style={styles.modalTextInfo}>Disponiveis = X   |   Totais = X</Text>
            </View>

            <TouchableOpacity style={styles.modalBtn}>
              <Text style={styles.modalTextTitle}>Prosseguir</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <View style={styles.mainGap}></View>
        <View style={styles.mainHeader}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Perfil')}>
            <View style={styles.mainHeaderSpace}>
              <Image source={require('../../assets/img/profile.png')} style={styles.mainHeaderProfile} />
              <View>
                <Text style={styles.mainHeaderText}>Olá,</Text>
                <Text style={styles.mainHeaderText}>{this.state.nomeUsuario}</Text>
              </View>
              <Image source={require('../../assets/img/icon_next.png')} style={styles.mainHeaderNext} />
            </View>
          </TouchableOpacity>
        </View>

        <MapView style={styles.mainMap}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.030,
            longitudeDelta: 0.050,
          }}>
          {this.state.listaBicicletarios.map((item) => {
            return (
              <Marker
                onPress={() => { this.setModalVisible(true); }}
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
            <TouchableOpacity>
              <Text style={styles.mainSearchInputText}>Para onde?</Text>
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
    width: 350,
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
  },
/*   testeModal: {
    flex: 1,
    height: 180,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }, */




  modalPoint: {
    backgroundColor: '#F5F5F5',
    width: 411,
    height: 232,
  },

  modalImage: {
    width: 30,
    height: 36
  },

  modalBtn: {
    width: 373,
    height: 50,
    justifyContent: 'center',
    alignContent: 'center'
  },

  modalTextTitle: {
    //fontFamily: ,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000'
  },

  modalText: {
    fontFamily: 'ABeeZee_400Regular',
    fontSize: 14,
    color: '#000'
  },

  modalTextInfo: {
    fontFamily: 'ABeeZee_400Regular',
    fontSize: 14,
    color: '#342C2C'
  },
});
