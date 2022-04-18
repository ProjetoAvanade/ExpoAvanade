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

import api from '../services/api';

export default class Ponto extends Component {  
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     idBicicletario: props.route.params.id,
  //     CEP: "",
  //     bairro: "",
  //     cidade: "",
  //     horarioAberto: "",
  //     horarioFechado: "",
  //     nome: "",
  //     numero: 0,
  //     rua: "",
  //     quantidadeVaga: 0,
  //     vagaDisponivel: 0,
  //   };
  // }

  // buscarInfoPonto = async () => {
  //   try {
  //     //console.warn(this.state.idBicicletario)
  //     const token = await AsyncStorage.getItem('userToken');
  //     const resposta = await api.get(`/Bicicletario/${this.state.idBicicletario}`, {
  //       headers: {
  //         Authorization: 'Bearer ' + token,
  //       },
  //     })
  //     if (resposta.status === 200) {
  //       this.setState({
  //         CEP: resposta.data.CEP,
  //         bairro: resposta.data.bairro,
  //         cidade: resposta.data.cidade,
  //         nome: resposta.data.nome,
  //         numero: resposta.data.numero,
  //         rua: resposta.data.rua,
  //         horarioAberto: resposta.data.horarioAberto,
  //         horarioFechado: resposta.data.horarioFechado,
  //         /*quantidadeVaga: resposta.data.idVaga[0].quantidadeVaga,
  //         vagaDisponivel: resposta.data.idVaga[0].vagaDisponivel, */
  //       });
  //     }
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // };

  // componentDidMount() {
  //   this.buscarInfoPonto();
  // }

  render() {
    return (
      <ScrollView>
        <View style={styles.main}>
          <ImageBackground style={styles.mainImage} source={require('../../assets/img/mapa.png')}>
            <TouchableOpacity style={styles.mainBtnBack} onPress={() => this.props.navigation.goBack()}>
              <Image style={styles.mainBtnBack} source={require('../../assets/img/Icone_voltar.png')} />
            </TouchableOpacity>

            <View style={styles.retangleAlignment}>
              <View style={styles.retangleBicicletario} />
            </View>
          </ImageBackground>

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
                <Text style={styles.textInfo}>Disponiveis = {this.state.vagaDisponivel}</Text>
                <Text style={styles.textInfo}>Totais = {this.state.quantidadeVaga}</Text>
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
    marginTop: '55%',
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
    fontFamily: 'ABeeZee_400Regular',    fontSize: 25,
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
});