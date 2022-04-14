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
      <ScrollView>
        <View style={styles.main}>
          {/*  <ImageBackground style={styles.mainImage} source={require('../../assets/img/mapa.png')}>
            <TouchableOpacity style={styles.mainBtnBack} onPress={() => this.props.navigation.goBack()}>
              <Image style={styles.mainBtnBack} source={require('../../assets/img/Icone_voltar.png')} />
            </TouchableOpacity>

            <View style={styles.retangleAlignment}>
              <View style={styles.retangleBicicletario} />
            </View>
          </ImageBackground> */}
          <View>
            <TouchableOpacity style={styles.mainBtnBack} onPress={() => this.props.navigation.goBack()}>
              <Image style={styles.mainBtnBack} source={require('../../assets/img/Icone_voltar.png')} />
            </TouchableOpacity>

            <MapView style={styles.mainMap}
              key={this.state.item.idBicicletario}
              initialRegion={{
                latitude: parseFloat(this.state.item.latitude),
                longitude: parseFloat(this.state.item.longitude),
                latitudeDelta: 0.014,
                longitudeDelta: 0.014,
              }}>
              <Marker
                coordinate={{
                  latitude: parseFloat(this.state.item.latitude),
                  longitude: parseFloat(this.state.item.longitude),
                }}
                title={this.state.item.nomeBicicletario}
                description={this.state.item.rua}>
                <Callout onPress={() => this.props.navigation.navigate('Vaga')}>
                  <Text style={styles.calloutText}>{this.state.item.nome}</Text>
                  <Text style={styles.calloutText}>Rua {this.state.item.rua}, {this.state.item.numero}</Text>
                </Callout>
              </Marker>
            </MapView>

            <View style={styles.retangleAlignment}>
              <View style={styles.retangleBicicletario} />
            </View>
          </View>

          <View style={styles.mainBody}>
            <View style={styles.titleSpace}>
              <Text style={styles.titleBicicletario}>{this.state.nome}</Text>
            </View>
            <View style={styles.infoBicicletario}>
              <View>
                <Text style={styles.titleInfo}>Endereço:</Text>
                <Text style={styles.textInfo}>{this.state.rua}, {this.state.numero} - {this.state.bairro}, {this.state.cidade}, {this.state.CEP}</Text>
              </View>
              <View>
                <Text style={styles.titleInfo}>Áreas atendidas:</Text>
                <Text style={styles.textInfo}>{this.state.cidade}</Text>
              </View>
              <View>
                <Text style={styles.titleInfo}>Horas:</Text>
                <Text style={styles.textInfo}>Aberto: {this.state.horarioAberto} ⋅ Fecha às {this.state.horarioFechado}</Text>
              </View>
              <View>
                <Text style={styles.titleInfo}>Vagas:</Text>
                <Text style={styles.textInfo}>Disponiveis = {this.state.qntdVagaDisponivel.length}</Text>
                <Text style={styles.textInfo}>Totais = {this.state.qntdVagaTotal}</Text>
              </View>

              <View style={styles.btnPosition}>
                <TouchableOpacity style={styles.btnPonto} onPress={() => this.props.navigation.navigate("Vaga")}>
                  <Text style={styles.cardPontosText}>Estou no ponto</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  // conteúdo da main
  main: {
    flex: 0.4,
    backgroundColor: '#CECED7',
  },

  mainBtnBack: {
    width: 20,
    height: 20,
    marginLeft: 13,
    marginTop: 20
  },

  mainImage: {
    height: 270,
  },

  retangleBicicletario: {
    width: 74,
    height: 7,
    backgroundColor: '#C4C4C4',
    borderColor: 'rgba(0, 0, 0, 0.6)',
    borderWidth: 1,
  },

  retangleAlignment: {
    alignItems: 'center',
    //marginTop: '58%',
  },

  mainBody: {
    height: 586,
    justifyContent: 'space-between',
  },

  titleSpace: {
    height: 103,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#rgba(0, 0, 0, 0.4)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },

  titleBicicletario: {
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 30,
    color: '#000'
  },

  infoBicicletario: {
    paddingLeft: 38,
    paddingRight: 38,
    flex: 1,
    justifyContent: 'space-evenly',
    paddingBottom: 10,
    paddingTop: 10,
  },

  titleInfo: {
    fontFamily: 'ABeeZee_400Regular', fontSize: 25,
    color: '#000',
  },

  textInfo: {
    fontFamily: 'ABeeZee_400Regular',
    fontSize: 18,
    color: '#000',
  },

  btnPosition: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnPonto: {
    backgroundColor: '#F3BC2C',
    width: 157,
    height: 60,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardPontosText: {
    fontSize: 18,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'IBMPlexMono_700Bold',
  },
  mainMap: {
    height: 279,
    width: 411,
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: '#ffffff',
    borderColor: '#000000',
  },
  calloutText: {
    fontSize: 14,
    fontFamily: 'ABeeZee_400Regular',
    color: '#000000',
  },
});