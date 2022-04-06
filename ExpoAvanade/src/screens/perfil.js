import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

export default class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nomeUsuario: '',
      email: '',
      pontos: 0,
      saldo: 0, 
    };
  }

  realizarLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      this.props.navigation.navigate('Login');
    } catch (error) {
      //console.warn(error);
    }
  }

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
    this.buscarInfoPerfil();
  }

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.mainHeader}>
          <Text style={styles.mainHeaderText}>Perfil</Text>
          <View style={styles.mainHeaderLine} />
        </View>

        <View style={styles.mainBody}>
          <View style={styles.mainBodyInfo}>

            <Image style={styles.imageProfile} source={require('../../assets/img/profile.png')} />

            <Text style={styles.mainBodyTitle}>{this.state.nomeUsuario}</Text>
            <Text style={styles.mainBodyText}>{this.state.email}</Text>
            <Text style={styles.mainBodyText}>Pontos: {this.state.pontos}</Text>
            <Text style={styles.mainBodyText}>Saldo: {this.state.saldo}</Text>

            <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.navigate('TrocaPontos')}>
              <Text style={styles.btnPontosText}>Trocar meus pontos</Text>
            </TouchableOpacity>

            <View style={styles.mainLine} />
            <TouchableOpacity style={styles.btn} onPress={this.realizarLogout}>
              <Text style={styles.btnLogoutText}>Sair</Text>
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
    backgroundColor: '#fff',
  },
  mainHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainHeaderText: {
    fontFamily: 'IBMPlexMono_700Bold',    fontSize: 36,
    color: '#333',
  },
  mainHeaderLine: {
    width: 155,
    paddingTop: 8,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  mainBody: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainBodyInfo: {
    alignItems: 'center',
  },
  imageProfile: {
    borderColor: '#F3BC2C',
    borderRadius: 67,
    borderWidth: 3,
    /* marginBottom: 20, */
  },
  mainBodyTitle: {
    color: '#000',
    fontSize: 25,
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'IBMPlexMono_700Bold',    fontSize: 25,
    textAlign: 'center',
    maxWidth: '80%',
  },
  mainBodyText: {
    fontFamily: 'ABeeZee_400Regular',
    color: '#000',
    fontSize: 20,
  },
  mainLine: {
    width: 250,
    marginTop: '8%',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  btn: {
    marginTop: '7%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 157,
    backgroundColor: '#F3BC2C',
    borderRadius: 5,
  },
  btnPontosText: {
    fontFamily: 'IBMPlexMono_700Bold',    fontSize: 18,

    color: '#000',
    textAlign: 'center',
  },
  btnLogoutText: {
    fontFamily: 'IBMPlexMono_700Bold',    fontSize: 25,
    color: '#000',
  },
  mainTituloSpace: {
    width: 200,
    height: 45,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 110,
  },
  mainBtnVoltar: {
    width: 20,
    height: 20,
  },
});