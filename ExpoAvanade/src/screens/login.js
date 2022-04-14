import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar
} from 'react-native';

import api from '../services/api';

import AsyncStorage from '@react-native-async-storage/async-storage';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: '',
      Senha: '',
      MensagemErro: '',
      IsLoading: false,
    };
  }

  realizarLogin = async () => {
    try {
      this.setState({ IsLoading: true, MensagemErro: '' });
      const resposta = await api.post('/Login', {
        email: this.state.Email,
        senha: this.state.Senha,
      })

      const token = resposta.data.token;
      await AsyncStorage.setItem('userToken', token);

      this.setState({ IsLoading: false });
      if (resposta.status == 200) {
        this.props.navigation.navigate('Main');
        //console.warn('Login efetuado com sucesso!');
        //console.warn(resposta)
      }
    } catch (error) {
      this.setState({ IsLoading: false, MensagemErro: 'E-mail e/ou senha inválidos!' })
      /* console.warn(error);
      console.log(error); */
    }
  };

  LimparCampos = () => {
    this.setState({ Email: '', Senha: '' })
  };

  componentDidMount() {
    this.LimparCampos();
  };

  render() {
    return (
      <View style={styles.main}>
        <StatusBar
          barStyle='dark-content'
          backgroundColor='#FFFFFF'
          hidden={false}
        />
        <View style={styles.mainDiv}>

          <View style={styles.mainImageSpace}>
            <Image source={require('../../assets/img/icon1.png')} style={styles.mainImage} />
          </View>

          <View style={styles.mainFormAlignment}>
            <TextInput
              style={styles.mainInput}
              placeholder='Endereço de E-mail'
              placeholderTextColor='#000000'
              keyboardType="email-address"
              onChangeText={Email => this.setState({ Email })}
            />
            <TextInput
              style={styles.mainInput}
              placeholder='Senha'
              placeholderTextColor='#000000'
              keyboardType="default"
              secureTextEntry={true}
              passwordRules
              onChangeText={Senha => this.setState({ Senha })}
            />

            {
              // Caso seja true, renderiza o botão desabilitado com o texto 'Loading...'
              this.state.IsLoading === true &&
              <TouchableOpacity style={styles.mainBtnLogin} disabled>
                <Text style={styles.mainBtnText}>Loading</Text>
              </TouchableOpacity>
            }

            {
              // Caso seja false, renderiza o botão habilitado com o texto 'Login'
              this.state.IsLoading === false &&
              <TouchableOpacity style={styles.mainBtnLogin} onPress={() => this.props.navigation.navigate('Main')}>
                <Text style={styles.mainBtnText}>Logar</Text>
              </TouchableOpacity>
            }

            <Text style={styles.mainTextError}>{this.state.MensagemErro}</Text>
          </View>

          <View style={styles.mainTextSpace}>
            <Text style={styles.mainText}>Esqueceu sua senha?</Text>
            <TouchableOpacity style={styles.mainBtnCadastro} onPress={() => this.props.navigation.navigate('Cadastro')}>
              <Text style={styles.mainText}>Não tem uma conta? Cadastre-se</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View >
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
  },
  mainDiv: {
    flex: 0.7,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  mainImageSpace: {
    width: 260,
    height: 166,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainImage: {
    width: 200,
    height: 100,
    marginTop: '10%',
  },
  mainFormAlignment: {
    alignItems: 'center',
  },
  mainInput: {
    width: 260,
    height: 60,
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 23,
    backgroundColor: '#ffffff',
    borderColor: '#F3BC2C',
    marginTop: '8%',
  },
  mainBtnLogin: {
    width: 157,
    height: 60,
    borderRadius: 5,
    backgroundColor: '#F3BC2C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8%',
  },
  mainBtnText: {
    fontSize: 25,
    fontFamily: 'IBMPlexMono_700Bold',
    color: '#000000'
  },
  mainTextError: {
    fontSize: 14,
    color: 'red',
    marginTop: '2%',
  },
  mainTextSpace: {
    height: 91,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainText: {
    fontSize: 14,
    fontFamily: 'ABeeZee_400Regular',
    color: '#000000',
  },
});
export default Login;