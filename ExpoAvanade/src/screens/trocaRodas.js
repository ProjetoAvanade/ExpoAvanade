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
      this.setState({ mensagemErro: `Troca inválida, você possui apenas ${this.state.pontos} pontos!` })
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
      this.setState({ mensagemErro: `Troca inválida, você possui apenas ${this.state.pontos} pontos!` })
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
      this.setState({ mensagemErro: `Troca inválida, você possui apenas ${this.state.pontos} pontos!` })
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
      this.setState({ mensagemErro: `Troca inválida, você possui apenas ${this.state.pontos} pontos!` })
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
    width: '68%',
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
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 25,
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
    fontFamily: 'IBMPlexMono_700Bold', color: '#000',
  },
  mainTextError: {
    fontSize: 14,
    fontFamily: 'ABeeZee_400Regular',
    color: '#ff0000'
  },
  mainTextSucess: {
    fontSize: 14,
    fontFamily: 'ABeeZee_400Regular',
    color: '#00ff00'
  }
});

export default TrocaRodas;
/* import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity, StatusBar
} from 'react-native';

import api from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function TrocaRodas({ navigation, route }) {
  //pontos: props.route.params.pontos,
  //const pontos = navigation.getParam('pontos')
  const [mensagemAcerto, setMensagemAcerto] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const trocarPontos15 = async () => {
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
        setMensagemAcerto(`Troca efetuada com sucesso!`)
      }
    } catch (error) {
      //console.warn(error);
      setMensagemErro(`Troca inválida, você possui apenas ${pontos} pontos!`)
    }
  };

  const trocarPontos30 = async () => {
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
        //console.warn('Troca efetuada com sucesso!');
        setMensagemAcerto(`Troca efetuada com sucesso!`)
      }
    } catch (error) {
      //console.warn(error);
      setMensagemErro(`Troca inválida, você possui apenas ${pontos} pontos!`)
    }
  };

  const trocarPontos45 = async () => {
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
        setMensagemAcerto(`Troca efetuada com sucesso!`)
      }
    } catch (error) {
      //console.warn(error);
      setMensagemErro(`Troca inválida, você possui apenas ${pontos} pontos!`)
    }
  };

  const trocarPontos60 = async () => {
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
        setMensagemAcerto(`Troca efetuada com sucesso!`)
      }
    } catch (error) {
      //console.warn(error);
      setMensagemErro(`Troca inválida, você possui apenas ${pontos} pontos!`)
    }
  };

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
            <TouchableOpacity onPress={() => navigation.goBack()}>
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

              <TouchableOpacity style={styles.btnPoints} onPress={trocarPontos15}>
                <Text style={styles.cardPointsBtnText}>Trocar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardPoints}>
              <View>
                <Text style={styles.cardPointsText}>30 pontos</Text>
                <Text style={styles.cardTextBalance}>R$2,00</Text>
              </View>

              <TouchableOpacity style={styles.btnPoints} onPress={trocarPontos30}>
                <Text style={styles.cardPointsBtnText}>Trocar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardPoints}>
              <View>
                <Text style={styles.cardPointsText}>45 pontos</Text>
                <Text style={styles.cardTextBalance}>R$3,00</Text>
              </View>

              <TouchableOpacity style={styles.btnPoints} onPress={trocarPontos45}>
                <Text style={styles.cardPointsBtnText}>Trocar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cardPoints}>
              <View>
                <Text style={styles.cardPointsText}>60 pontos</Text>
                <Text style={styles.cardTextBalance}>R$4,00</Text>
              </View>

              <TouchableOpacity style={styles.btnPoints} onPress={trocarPontos60}>
                <Text style={styles.cardPointsBtnText}>Trocar</Text>
              </TouchableOpacity>
            </View>

            {mensagemErro != '' &&
              <Text style={styles.mainTextError}>{mensagemErro}</Text>
            }

            {mensagemAcerto != '' &&
              <Text style={styles.mainTextSucess}>{mensagemAcerto}</Text>
            }
          </View>
        </View>
      </View >
    );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F7F7F7',
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
    width: '68%',
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
    fontFamily: 'IBMPlexMono_700Bold',
    fontSize: 25,
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
    fontFamily: 'IBMPlexMono_700Bold', color: '#000',
  },
  mainTextError: {
    fontSize: 14,
    fontFamily: 'ABeeZee_400Regular',
    color: '#ff0000'
  },
  mainTextSucess: {
    fontSize: 14,
    fontFamily: 'ABeeZee_400Regular',
    color: '#00ff00'
  }
}); */