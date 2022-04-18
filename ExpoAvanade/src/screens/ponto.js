import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Callout, Marker } from 'react-native-maps';
import api from '../services/api';

export default class Ponto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.route.params.id,
      CEP: "",
      bairro: "",
      cidade: "",
      horarioAberto: "",
      horarioFechado: "",
      nome: "",
      numero: 0,
      rua: "",
      listaVagas: [],
      qntdVagaTotal: 0,
      qntdVagaDisponivel: [],
    };
  }

  buscarInfoPonto = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const resposta = await api.get(`/Bicicletario/${this.state.item.idBicicletario}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      if (resposta.status === 200) {
        this.setState({
          CEP: resposta.data.CEP,
          bairro: resposta.data.bairro,
          cidade: resposta.data.cidade,
          nome: resposta.data.nome,
          numero: resposta.data.numero,
          rua: resposta.data.rua,
          horarioAberto: resposta.data.horarioAberto,
          horarioFechado: resposta.data.horarioFechado,
        });
      }
    } catch (error) {
      //console.warn(error);
    }
  };

  buscarVagasPonto = async () => {
    try {
      var arr = [];
      const token = await AsyncStorage.getItem('userToken');
      const resposta = await api.get(`/Vagas/${this.state.item.idBicicletario}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      const dadosDaApi = resposta.data;
      this.setState({
        listaVagas: dadosDaApi,
        qntdVagaTotal: dadosDaApi.length,
      })

      // console.warn(this.state.listaVagas[1])
      //console.warn(this.state.listaVagas)

      if (this.state.listaVagas != []) {
        this.state.listaVagas.forEach(function (b) {
          if (b.statusVaga == true) {
            arr.push(b)
          }
        });
        //console.warn(arr)
      }

      this.setState({
        qntdVagaDisponivel: arr
      })
    } catch (error) {
      //console.warn(error);
    }
  };

  componentDidMount() {
    this.buscarInfoPonto();
    this.buscarVagasPonto();
  }

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
