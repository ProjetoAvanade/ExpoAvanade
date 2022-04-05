import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import api from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Mapa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaBicicletarios: [],
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
      if (resposta.status === 200) {
        const dadosDaApi = resposta.data;
        // atualiza o state listaEventos com este corpo da requisição
        this.setState({ listaBicicletarios: dadosDaApi });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  componentDidMount() {
    this.buscarBicicletarios();
  }

  render() {
    return (
      <View style={styles.main}>

        {/* <MapView style={styles.mainMapa}
          /* initialRegion={{
             latitude: listaBicicletarios[0].latitude,
            longitude: listaBicicletarios[0].longitude, 
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }} >
          <Marker onPress={() => this.props.navigation.navigate('Ponto')}
            initialRegion={{
              latitude: -23.5344611,
              longitude: -46.6477011,
            }} />
        </MapView> */}
        <MapView style={styles.mainMapa}>
          <Marker onPress={() => this.props.navigation.navigate('Ponto')}
            coordinate={{
              latitude: -23.5344611,
              longitude: -46.6477011,
            }} />
        </MapView>
        {/* <View style={styles.main}>
          <FlatList
            data={this.state.listaBicicletarios}
            keyExtractor={item => item.idBicicletario}
            renderItem={this.renderItem}
          />
        </View> */}

        <View style={styles.mainNavegar}>
          <View style={styles.mainMenuNavegar}>
            <View style={styles.mainDividir}>
              <TouchableOpacity style={styles.mainBtn} onPress={() => this.props.navigation.navigate('Pesquisa')}>
                <Text style={styles.mainBtnTexto}>Pesquisa</Text>
              </TouchableOpacity>
              <TextInput style={styles.mainMenuInput}>Para onde? <Image source={require('../../assets/img/Icone_lupa.png')} style={styles.mainImagem} /> </TextInput>
            </View>
          </View>
        </View>
      </View >
    );
  }

  /* renderItem = ({ item }) => (
    //<Text style={{ fontSize: 20, color: 'red' }}>{item.idBicicletario}</Text>
    <MapView style={styles.mainMapa}>
      <Marker onPress={() => this.props.navigation.navigate('Ponto')}
        key={item.idBicicletario}
        coordinate={{
          latitude: -23.5344611,
          longitude: -46.6477011,
        }} />
    </MapView>
  );*/
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
  },

  mainMapa: {
    flex: 0.85,
    width: 411,
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: '#ffffff',
    borderColor: '#000000',
  },

  mainNavegar: {
    flex: 0.15,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainMenuNavegar: {
    width: 394,
    height: 60,
    borderRadius: 5,
    backgroundColor: '#F3BC2C',
  },

  mainDividir: {
    width: 394,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },

  mainMenuInput: {
    width: 320,
    height: 30,
    paddingLeft: 23,
    paddingTop: 0,
    fontSize: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000000',
    backgroundColor: '#ffffff',
  },

  mainImagem: {
    width: 20,
    height: 20,
  },
});


/*
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

export default class Mapa extends Component {

  realizarBusca = () => {
    this.props.navigation.navigate('Pesquisa');
  }

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.mainMapa}>

        </View>

        <View style={styles.mainNavegar}>
          <View style={styles.mainMenuNavegar}>
            <View style={styles.mainDividir}>
              <TouchableOpacity style={styles.mainBtn} onPress={this.realizarBusca}>
                <Text style={styles.mainBtnTexto}>Pesquisa</Text>
              </TouchableOpacity>
              <TextInput style={styles.mainMenuInput}>Para onde? <Image source={require('../../assets/img/Icone_lupa.png')} style={styles.mainImagem} /> </TextInput>
            </View>
          </View>
        </View>

      </View >
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
  },

  mainMapa: {
    flex: 0.85,
    width: 411,
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: '#ffffff',
    borderColor: '#000000',
  },

  mainNavegar: {
    flex: 0.15,
    backgroundColor: '#F7F7F7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  mainMenuNavegar: {
    width: 394,
    height: 60,
    borderRadius: 5,
    backgroundColor: '#F3BC2C',
  },

  mainDividir: {
    width: 394,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },

  mainMenuInput: {
    width: 320,
    height: 30,
    paddingLeft: 23,
    paddingTop: 0,
    fontSize: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#000000',
    backgroundColor: '#ffffff',
  },

  mainImagem: {
    width: 20,
    height: 20,
  },
}); */