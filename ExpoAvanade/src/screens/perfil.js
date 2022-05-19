import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';

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
      cpf: '',
      dataNascimento: Date(),
      imagem: '',
      uri: '',
      pontos: 0,
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
          dataNascimento: dadosDaApi.dataNascimento,
          cpf: dadosDaApi.cpf,
          imagem: dadosDaApi.imagem,
          pontos: dadosDaApi.pontos
        });
        let apiImg = 'https://api-avanade.azurewebsites.net'
        //let apiImg = 'http://192.168.4.187:5000'
        this.setState({uri: `${apiImg}/StaticFiles/imagem/${this.state.imagem}`})
        //console.warn(this.state.uri)
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
        <StatusBar
          barStyle='dark-content'
          backgroundColor='#F3BC2C'
          hidden={false}
        />

        <View style={styles.mainGap}></View>
        <View style={styles.mainHeader}>
          <View style={styles.mainHeaderSpace}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image source={require('../../assets/img/icon_back.png')} style={styles.mainHeaderImage} />
            </TouchableOpacity>

            <Text style={styles.mainHeaderText}>Meu perfil</Text>
          </View>
        </View>

        <View style={styles.mainContent}>
          <TouchableOpacity>
            {
              this.state.imagem != '' &&
              <Image
                source={{ uri: this.state.uri }}
                style={styles.mainContentImage} />
            }

            {
              this.state.imagem == '' &&
              <Image
                source={require('../../assets/img/icon_mold.png')}
                style={styles.mainContentImage} />
            }
          </TouchableOpacity>
          <View style={styles.mainContentTexts}>
            <Text style={styles.mainContentTextName}>{this.state.nomeUsuario}</Text>
            <Text style={styles.mainContentTextEmail}>{this.state.email}</Text>
          </View>
          <Text style={styles.mainContentTextAccount}>Minha conta</Text>
        </View>

        <View style={styles.mainCard}>
          <Image source={require('../../assets/img/icon_person.png')} style={styles.mainCardImage} />
          <View>
            <Text style={styles.mainCardsTextName}>Dados pessoais</Text>
            {/* <Text style={styles.mainCardsTextEmail}>{nomeUsuario},
            {Intl.DateTimeFormat("pt-BR", {
              year: 'numeric', month: 'short', day: 'numeric',
            }).format(new Date(Cpf))},
            {dataNascimento}
          </Text> */}
            <Text style={styles.mainCardsTextEmail}>{this.state.nomeUsuario}, {this.state.cpf}, {this.state.dataNascimento}</Text>
          </View>
        </View>

        <View style={styles.mainCard}>
          <Image source={require('../../assets/img/icon_email.png')} style={styles.mainCardImage} />
          <View>
            <Text style={styles.mainCardsTextName}>Email</Text>
            <Text style={styles.mainCardsTextEmail}>{this.state.email}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.mainCard} onPress={() => navigation.navigate('Carteira')}>
          <Image source={require('../../assets/img/icon_money.png')} style={styles.mainCardImage} />
          <View>
            <Text style={styles.mainCardsTextName}>Saldo</Text>
            <Text style={styles.mainCardsTextEmail}>R${this.state.saldo}</Text>
          </View>
          <Text style={styles.mainCardsTextTrade2}>Adicionar</Text>
          <Image source={require('../../assets/img/icon_next.png')} style={styles.mainCardNext} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainCard} onPress={() => this.props.navigation.navigate('TrocaRodas', { pontos: this.state.pontos })}>
          <Image source={require('../../assets/img/icon_wheel.png')} style={styles.mainCardImage} />
          <View>
            <Text style={styles.mainCardsTextName}>Minhas rodas</Text>
            <Text style={styles.mainCardsTextEmail}>{this.state.pontos}</Text>
          </View>
          <Text style={styles.mainCardsTextTrade}>Trocar</Text>
          <Image source={require('../../assets/img/icon_next.png')} style={styles.mainCardNext} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainCard} onPress={() => this.realizarLogout()}>
          <Image source={require('../../assets/img/icon_leave.png')} style={styles.mainCardImage} />
          <View>
            <Text style={styles.mainCardsTextName}>Sair</Text>
          </View>
        </TouchableOpacity>

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
    height: '7.6%',
    backgroundColor: '#F3BC2C',
    justifyContent: 'center',
  },
  mainHeaderSpace: {
    width: '63%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // marginLeft: 18,
    marginLeft: '4.7%',
  },
  mainHeaderImage: {
    width: 25,
    height: 21.56,
  },
  mainHeaderText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 25,
  },
  mainContent: {
    width: '100%',
    // height: 261,
    height: '33.5%',
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  mainContentImage: {
    width: 103,
    height: 102,
  },
  mainContentTexts: {
    alignItems: 'center'
  },
  mainContentTextName: {
    fontSize: 25,
    color: '#000000',
    fontFamily: 'ABeeZee_400Regular',

  },
  mainContentTextEmail: {
    fontSize: 20,
    color: '#797979',
    fontFamily: 'ABeeZee_400Regular',

  },
  mainContentTextAccount: {
    color: '#F3BC2C',
    marginRight: '75%',
    fontFamily: 'ABeeZee_400Regular',

  },
  mainCard: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#000000'
  },
  mainCardImage: {
    width: 30,
    marginLeft: 15,
  },
  mainCardsTextName: {
    marginLeft: 15,
    fontSize: 14,
    color: '#000000',
    fontFamily: 'ABeeZee_400Regular',

  },
  mainCardsTextEmail: {
    marginLeft: 15,
    fontSize: 14,
    color: '#797979',
    fontFamily: 'ABeeZee_400Regular',

  },
  mainCardNext: {
    marginLeft: 5,
    width: 20
  },
  mainCardsTextTrade: {
    marginLeft: 180,
    fontSize: 14,
    color: '#000000',
    fontFamily: 'ABeeZee_400Regular',

  },
  mainCardsTextTrade2: {
    marginLeft: 210,
    fontSize: 14,
    color: '#000000',
    fontFamily: 'ABeeZee_400Regular',

  },
});