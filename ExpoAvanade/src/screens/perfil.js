import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, LogBox } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'

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

  // Função para realizar o logout, removendo o token do AsyncStorage
  realizarLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      this.props.navigation.navigate('Login');
    } catch (error) {
      //console.warn(error);
    }
  }

  // Função para conseguir as informações do usuário logado
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
        this.setState({ uri: `${apiImg}/StaticFiles/imagem/${this.state.imagem}` })
        //console.warn(this.state.uri)
        this.formartarCpf()
      }
    } catch (error) {
      //console.warn(resposta)
      //console.warn(error);
    }
  };

  formartarCpf = () => {
    return this.setState({ cpf: this.state.cpf.slice(0, 3) + "." + this.state.cpf.slice(3, 6) + "." + this.state.cpf.slice(6, 9) + "-" + this.state.cpf.slice(9, 11) })
  }

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
            { // Renderizar a imagem escolhida pelo usuário
              this.state.imagem != '' &&
              <Image
                source={{ uri: this.state.uri }}
                style={styles.mainContentImage} />
            }

            { // Renderizar imagem de perfil padrão
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
            <Text style={styles.mainCardsTextEmail}>{this.state.nomeUsuario}, {this.state.cpf}, {Intl.DateTimeFormat("pt-BR", {
                year: 'numeric', month: 'short', day: 'numeric',
              }).format(new Date(this.state.dataNascimento))}</Text>
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
        </TouchableOpacity>

        <TouchableOpacity style={styles.mainCard} onPress={() => this.props.navigation.navigate('TrocaRodas', { pontos: this.state.pontos })}>
          <Image source={require('../../assets/img/icon_wheel.png')} style={styles.mainCardImage} />
          <View>
            <Text style={styles.mainCardsTextName}>Minhas rodas</Text>
            <Text style={styles.mainCardsTextEmail}>{this.state.pontos}</Text>
          </View>

          <View style={styles.mainCardsTrade}>
            <Text style={styles.mainCardsTextTrade}>Trocar</Text>
            <Image source={require('../../assets/img/icon_next.png')} style={styles.mainCardNext} />
          </View>
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

/* Quando é passado uma uri dinânica para listar a imagem do usuário dá esse erro de string vazia, 
não aguarda a requisição trazendo a imagem */
LogBox.ignoreLogs(['source.uri should not be an empty string']);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  mainGap: {
    height: '2.5%',
  },
  mainHeader: {
    width: '100%',
    height: '7.6%',
    backgroundColor: '#F3BC2C',
    justifyContent: 'center',
  },
  mainHeaderSpace: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginRight: '27%',
  },
  mainHeaderImage: {
    width: 25,
    height: 21.56,
    marginRight: '10%'
  },
  mainHeaderText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 25,
  },
  mainContent: {
    width: '100%',
    height: '33.5%',
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  mainContentImage: {
    width: 103,
    height: 102,
    borderRadius: 67,
  },
  mainContentTexts: {
    alignItems: 'center'
  },
  mainContentTextName: {
    fontSize: 25,
    color: '#000',
    fontFamily: 'Poppins_700Bold',
  },
  mainContentTextEmail: {
    fontSize: 20,
    color: '#797979',
    fontFamily: 'ABeeZee_400Regular',
  },
  mainContentTextAccount: {
    color: '#F3BC2C',
    marginRight: '70%',
    fontFamily: 'ABeeZee_400Regular',
  },
  mainCard: {
    width: '100%',
    height: '11.3%',
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
    maxWidth: '95%'
  },
  mainCardNext: {
    marginLeft: 5,
    width: 20
  },
  mainCardsTrade: {
    flexDirection: 'row',
    paddingLeft: '35%',
  },
  mainCardsTextTrade: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'ABeeZee_400Regular',
  },
});