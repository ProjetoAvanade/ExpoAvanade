import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

//import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: '',
      Senha: '',
      MensagemErro: '',
      idLoading: false
    };
  }
  /* //como vamos trabalhar com assync historage,
  //nossa funcao tem que ser async.
  realizarLogin = async () => {
    //nao temos mais  console log.
    //vamos utilizar console.warn.

    //apenas para teste.
    //console.warn(this.state.Email + ' ' + this.state.Senha);

    const resposta = await api.post('/Login', {
      Email: this.state.Email, //roberto.possarle@spmedicalgroup.com.br
      Senha: this.state.Senha, //1234
    })
      .catch(MensagemErro => {
        this.setState({ MensagemErro: 'E-mail ou senha incorretos!' })
      });

    this.setState({ isLoading: false })

    //mostrar no swagger para montar.
    const token = resposta.data.token;
    await AsyncStorage.setItem('userToken', token);

    const valorToken = await AsyncStorage.getItem('userToken');

    if (resposta.status == 200) {
      this.props.navigation.navigate('Mapa');
      console.log("suacesso")
    }

  }; */

  /* realizarLogin = async () => {
    try {
      const resposta = await api.post('/Login', {
        Email: this.state.Email, //paulo@email.com
        Senha: this.state.Senha, //123456789
      })
      const token = resposta.data.token


      // const token = await AsyncStorage.getItem('userToken');

      // await AsyncStorage.setItem('userToken', token)


      // AsyncStorage.setItem('patrimonio-chave-autenticacao', token)
      if (resposta.status == 200) {
        //const dadosDaApi = resposta.data;
        this.props.navigation.navigate('Main');
        console.warn("Sucesso")
      };
      //console.warn(this.state.CEP);
    } catch (error) {
      console.warn(error);
    }
  }; */

   realizarLogin = () => {
     this.props.navigation.navigate('Main');
   }

  LimparCampos = () => {
    this.setState({ Email: '', Senha: '', MensagemErro: '' })
  };

  componentDidMount() {
    this.LimparCampos()
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

            <TouchableOpacity style={styles.mainBtn} onPress={this.realizarLogin}>
              <Text style={styles.mainBtnTexto}>Logar</Text>
            </TouchableOpacity>

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