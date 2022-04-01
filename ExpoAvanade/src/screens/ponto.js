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

import api from '../services/api';

export default class Ponto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idBicicletario: 1,
      CEP: "",
      bairro: "",
      cidade: "",
      horarioAberto: "",
      horarioFechado: "",
      nome: "",
      numero: 0,
      rua: "",
      quantidadeVaga: 0,
      vagaDisponivel: 0,
    };
  }

  buscarInfoPonto = async () => {
    try {
      //const token = await AsyncStorage.getItem('userToken');
      const resposta = await api.get('/Bicicletarios/1');
      /*{
           headers: {
            Authorization: 'Bearer ' + token,
          },
        },*/
      if (resposta.status === 200) {
        //const dadosDaApi = resposta.data;
        this.setState({
          CEP: resposta.data.CEP,
          bairro: resposta.data.bairro,
          cidade: resposta.data.cidade,
          nome: resposta.data.nome,
          numero: resposta.data.numero,
          rua: resposta.data.rua,
          horarioAberto: resposta.data.horarioAberto,
          horarioFechado: resposta.data.horarioFechado,
          quantidadeVaga: resposta.data.idVaga[0].quantidadeVaga,
          vagaDisponivel: resposta.data.idVaga[0].vagaDisponivel,
        });
        //console.warn(this.state.CEP);
      }
    } catch (error) {
      //console.warn(error);
    }
  };

  goBack = () => {
    this.props.navigation.goBack();
  }

  componentDidMount() {
    this.buscarInfoPonto();
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.main}>
          <ImageBackground style={styles.imgPonto} source={require('../../assets/img/mapa.png')}>
            <TouchableOpacity style={styles.mainBtnVoltar} onPress={this.goBack}>
              <Image style={styles.mainBtnVoltar} source={require('../../assets/img/Icone_voltar.png')} />
            </TouchableOpacity>
            <View style={styles.alinhamentoRetangulo}>
              <View style={styles.retanguloBicicletario} />
            </View>
          </ImageBackground>
          <View style={styles.mainBody}>
            <View style={styles.espacoTitulo}>
              <Text style={[styles.tituloBicicletario, styles.sombra]}>{this.state.nome}</Text>
            </View>
            <View style={styles.infoBicicletario}>
              <View>
                <Text style={styles.tituloInfo}>Endereço:</Text>
                <Text style={styles.textoInfo}>{this.state.rua}, {this.state.numero} - {this.state.bairro}, {this.state.cidade}, {this.state.CEP}</Text>
              </View>
              <View>
                <Text style={styles.tituloInfo}>Áreas atendidas:</Text>
                <Text style={styles.textoInfo}>{this.state.cidade}</Text>
              </View>
              <View>
                <Text style={styles.tituloInfo}>Horas:</Text>
                <Text style={styles.textoInfo}>Aberto: {this.state.horarioAberto} ⋅ Fecha às {this.state.horarioFechado}</Text>
              </View>
              <View>
                <Text style={styles.tituloInfo}>Vagas:</Text>
                <Text style={styles.textoInfo}>Disponiveis = {this.state.vagaDisponivel}</Text>
                <Text style={styles.textoInfo}>Totais = {this.state.quantidadeVaga}</Text>
              </View>
              <View style={styles.btnPosicionamento}>
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
    flex: 1,
    backgroundColor: '#CECED7',
  },

  mainBtnVoltar: {
    width: 20,
    height: 20,
    marginLeft: 13,
    marginTop: 7
  },

  imgPonto: {
    height: 270,
  },

  retanguloBicicletario: {
    width: 74,
    height: 7,
    backgroundColor: '#C4C4C4',
    borderColor: 'rgba(0, 0, 0, 0.6)',
    borderWidth: 1,
  },

  alinhamentoRetangulo: {
    alignItems: 'center',
    marginTop: '58%',
  },

  mainBody: {
    flex: 1,
    justifyContent: 'space-between',
  },

  espacoTitulo: {
    height: 103,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#rgba(0, 0, 0, 0.4)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },

  tituloBicicletario: {
    //fontFamily: '',
    fontSize: 30,
    fontWeight: 'bold',
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

  tituloInfo: {
    //fontFamily: '',
    fontSize: 25,
    color: '#000',
  },

  textoInfo: {
    //fontFamily: '',
    fontSize: 18,
    color: '#000',
  },

  btnPosicionamento: {
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
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    fontFamily: 'ABeeZee-Regular'
  },
});