import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
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
      isLoading: false,
      Email: '',
    };
  }

  realizarLogin = async () => {
    try {
      this.setState({ erroMensagem: '', isLoading: true });
      const resposta = await api.post('/Login', {
        email: this.state.Email,
        senha: this.state.Senha,
      })
        .catch(MensagemErro => {
          this.setState({ MensagemErro: 'E-mail e/ou senha inválidos!', isLoading: false })
        });

      this.setState({ isLoading: false });
      const token = resposta.data.token;
      await AsyncStorage.setItem('userToken', token);

      if (resposta.status == 200) {
        this.props.navigation.navigate('Main');
        /* console.warn('Login efetuado com sucesso!');
        console.warn(token) */
      }
    } catch (error) {
      /* console.warn(error);
      console.log(error); */
    }
  };

  LimparCampos = () => {
    this.setState({ Email: '', Senha: '', MensagemErro: ''})
  };

  componentDidMount() {
    this.LimparCampos();
  };

  realizarCadastro = () => {
    this.props.navigation.navigate('Cadastro');
  }

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.mainDiv}>

          <View style={styles.mainImagemSpace}>
            <Image source={require('../../assets/img/icon.png')} style={styles.mainImagem} />
          </View>
          <View style={styles.mainFormSpace}>
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
              this.state.isLoading === true &&
              <TouchableOpacity style={styles.mainBtn} disabled={this.state.isLoading === true}>
                <Text style={styles.mainBtnTexto}>Loading</Text>
              </TouchableOpacity>
            }

            {
              // Caso seja false, renderiza o botão habilitado com o texto 'Login'
              this.state.isLoading === false &&
              <TouchableOpacity style={styles.mainBtn} onPress={this.realizarLogin} disabled={this.state.Email === '' || this.state.Senha === '' ? 'none' : ''}>
                <Text style={styles.mainBtnTexto}>Logar</Text>
              </TouchableOpacity>
            }
            
            <Text style={styles.mensagemErro}>{this.state.MensagemErro}</Text>
          </View>

          <View style={styles.mainTextoSpace}>

            <Text style={styles.mainTexto}>Esqueceu sua senha?</Text>
            <TouchableOpacity style={styles.mainBtnCadastro} onPress={this.realizarCadastro}>
              <Text style={styles.mainTexto}>Não tem uma conta? Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  // conteúdo da main
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
  },

  mainDiv: {
    flex: 0.9,
    backgroundColor: 'white',
    height: 517,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  mainImagemSpace: {
    width: 260,
    height: 166,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainImagem: {
    marginTop: 20,
    width: 132,
    height: 96,
  },

  mainFormSpace: {
    height: 240,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  mainInput: {
    width: 260,
    height: 60,
    backgroundColor: '#ffffff',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: '#F3BC2C',
    paddingLeft: 23,
  },

  mainBtn: {
    backgroundColor: '#F3BC2C',
    width: 157,
    height: 60,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  mainBtnTexto: {
    //fontFamily: '',
    fontSize: 14,
    color: '#000000'
  },

  mainTextoSpace: {
    height: 91,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  mainTexto: {
    fontSize: 14,
    color: '#000000',
    //fontFamily: 'ABeeZee-Regular'
  },

  mensagemErro: {
    color: 'red',
    fontSize: 16,
    marginTop: '2%',
  },
});

export default Login;