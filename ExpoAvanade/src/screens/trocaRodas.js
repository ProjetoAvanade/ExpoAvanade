import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity, StatusBar
} from 'react-native';

import api from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

class TrocaRodas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pontos: props.route.params.pontos,
      mensagemAcerto: '',
      mensagemErro: ''
    };
  }
  
  trocarPontos15 = async () => {
    try {
      //console.warn(this.state.pontos)
      const token = await AsyncStorage.getItem('userToken');
      const resposta = await api.put('/Usuario', {
        saldo: 1
      },
      {
        headers: { Authorization: 'Bearer ' + token },
      })
      
      if (resposta.status == 200) {
        //console.warn('Troca efetuada com sucesso!');
        this.setState({ mensagemAcerto: `Troca efetuada com sucesso!` })
      }
    } catch (error) {
      //console.warn(error);
      this.setState({ mensagemErro: `Troca inválida, você não possui pontos suficientes!` })
    }
  };

  trocarPontos30 = async () => {
    try {
      //console.warn(this.state.pontos)
      const token = await AsyncStorage.getItem('userToken');
      const resposta = await api.put('/Usuario', {
        saldo: 2
      },
        {
          headers: { Authorization: 'Bearer ' + token },
        })
        
        if (resposta.status == 200) {
          console.warn('Troca efetuada com sucesso!');
          this.setState({ mensagemAcerto: `Troca efetuada com sucesso!` })
        }
    } catch (error) {
      //console.warn(error);
      this.setState({ mensagemErro: `Troca inválida, você não possui pontos suficientes!` })
    }
  };
  
  trocarPontos45 = async () => {
    try {
      //console.warn(this.state.pontos)
      this.setState({ mensagemErro: '' });
      const token = await AsyncStorage.getItem('userToken');
      const resposta = await api.put('/Usuario', {
        saldo: 3
      },
      {
        headers: { Authorization: 'Bearer ' + token },
      })
      
      if (resposta.status == 200) {
        //console.warn('Troca efetuada com sucesso!');
        this.setState({ mensagemAcerto: `Troca efetuada com sucesso!` })
      }
    } catch (error) {
      //console.warn(error);
      this.setState({ mensagemErro: `Troca inválida, você não possui pontos suficientes!` })
    }
  };
  
  trocarPontos60 = async () => {
    try {
      //console.warn(this.state.pontos)
      const token = await AsyncStorage.getItem('userToken');
      const resposta = await api.put('/Usuario', {
        saldo: 4
      },
      {
        headers: { Authorization: 'Bearer ' + token },
      })
      
      if (resposta.status == 200) {
        //console.warn('Troca efetuada com sucesso!');
        this.setState({ mensagemAcerto: `Troca efetuada com sucesso!` })
      }
    } catch (error) {
      //console.warn(error);
      this.setState({ mensagemErro: `Troca inválida, você não possui pontos suficientes!` })
    }
  };

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
            <Text style={styles.mainHeaderText}>Minhas rodas</Text>
          </View>
        </View>

        <View style={styles.mainBody}>
          <View style={styles.mainCards}>
            <View style={styles.cardPoints}>
              <View>
                <Text style={styles.cardPointsText}>15 pontos</Text>
                <Text style={styles.cardTextBalance}>R$1,00</Text>
              </View>

              <TouchableOpacity style={styles.btnPoints} onPress={this.trocarPontos15}>
                <Text style={styles.cardPointsBtnText}>Trocar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardPoints}>
              <View>
                <Text style={styles.cardPointsText}>30 pontos</Text>
                <Text style={styles.cardTextBalance}>R$2,00</Text>
              </View>

              <TouchableOpacity style={styles.btnPoints} onPress={this.trocarPontos30}>
                <Text style={styles.cardPointsBtnText}>Trocar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardPoints}>
              <View>
                <Text style={styles.cardPointsText}>45 pontos</Text>
                <Text style={styles.cardTextBalance}>R$3,00</Text>
              </View>

              <TouchableOpacity style={styles.btnPoints} onPress={this.trocarPontos45}>
                <Text style={styles.cardPointsBtnText}>Trocar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardPoints}>
              <View>
                <Text style={styles.cardPointsText}>60 pontos</Text>
                <Text style={styles.cardTextBalance}>R$4,00</Text>
              </View>

              <TouchableOpacity style={styles.btnPoints} onPress={this.trocarPontos60}>
                <Text style={styles.cardPointsBtnText}>Trocar</Text>
              </TouchableOpacity>
            </View>

            {this.state.mensagemErro != '' &&
              <Text style={styles.mainTextError}>{this.state.mensagemErro}</Text>
            }

            {this.state.mensagemAcerto != '' &&
              <Text style={styles.mainTextSucess}>{this.state.mensagemAcerto}</Text>
            }
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
  mainGap: {
    // height: 37,
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
    marginRight: '18%',
  },
  mainHeaderImage: {
    width: 25,
    height: 21.56,
  },
  mainHeaderText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 25,
    marginRight: '3%'
  },
  mainBody: {
    flex: 4,
    alignItems: 'center',
  },
  mainCards: {
    flex: 1,
    justifyContent: 'space-evenly',
    paddingBottom: 150,
  },
  cardPoints: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: 300,
    height: 73,
    backgroundColor: '#FFF',
    borderColor: '#F3BC2C',
    borderWidth: 2,
    borderRadius: 5,
  },
  cardPointsText: {
    fontSize: 20,
    fontFamily: 'ABeeZee_400Regular',
    color: '#000',
  },
  cardTextBalance: {
    fontSize: 14,
    fontFamily: 'ABeeZee_400Regular',
    color: '#797979',
  },
  btnPoints: {
    backgroundColor: '#F3BC2C',
    width: 116,
    height: 37,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardPointsBtnText: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#000',
  },
  mainTextError: {
    fontSize: 16,
    fontFamily: 'ABeeZee_400Regular',
    color: '#ff0000',
    maxWidth: '80%'
  },
  mainTextSucess: {
    fontSize: 18,
    fontFamily: 'ABeeZee_400Regular',
    color: '#06D106',
    textAlign: 'center'
  }
});

export default TrocaRodas;