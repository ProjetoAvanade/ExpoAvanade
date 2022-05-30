import React, { useState, useEffect } from 'react';
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
/* import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession(); */

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  /* const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();
  const [message, setMessage] = useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "694235095257-fkbf1u81sm5ii76om74j5b7h8u4v2m7a.apps.googleusercontent.com",
    iosClientId: "694235095257-qnub27n3o6s0e3lo1sneio03o6ka5k9m.apps.googleusercontent.com",
    expoClientId: "273107586669-e5gouu3ks6fqroo352ba6nh9jefept70.apps.googleusercontent.com"
  }) */

  const realizarLogin = async () => {
    try {
      setIsLoading(true);
      setMensagemErro('');
      const resposta = await api.post('/Login', {
        email: email,
        senha: senha,
      })

      const token = resposta.data.token;
      await AsyncStorage.setItem('userToken', token);
      setIsLoading(false);
      if (resposta.status == 201) {
        navigation.navigate('Main');
        //console.warn('Login efetuado com sucesso!');
        //console.warn(resposta)
      }
    } catch (error) {
      setIsLoading(false);
      setMensagemErro('E-mail e/ou senha inválidos!');
      //console.warn(error);
      //console.log(error);
    }
  };

  const limparCampos = () => {
    setEmail('');
    setSenha('')
  };

  useEffect(() => {
    limparCampos();
  }, []);

  return (
    <View style={styles.main}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor='#FFFFFF'
        hidden={false}
      />
      <View style={styles.mainDiv}>

        <View style={styles.mainImageSpace}>
          <Image source={require('../../assets/icon1.png')} style={styles.mainImage} />
        </View>

        <View style={styles.mainFormAlignment}>
          <TextInput
            style={styles.mainInput}
            placeholder='Endereço de E-mail'
            placeholderTextColor='#000000'
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="done"
            autoCorrect={false}
            maxLength={28}
            onChangeText={Email => setEmail(Email)}
          />
          <TextInput
            style={styles.mainInput}
            placeholder='Senha'
            placeholderTextColor='#000000'
            keyboardType="default"
            secureTextEntry={true}
            passwordRules
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="done"
            maxLength={20}
            onChangeText={Senha => setSenha(Senha)}
          />

          { // Caso seja true, renderiza o botão desabilitado com o texto 'Carregando...'
            isLoading === true &&
            <TouchableOpacity style={styles.btnLoginDisabled} disabled>
              <Text style={styles.mainBtnText}>Carregando...</Text>
            </TouchableOpacity>
          }

          { // Caso seja false, renderiza o botão habilitado com o texto 'Login'
            isLoading === false &&
            <TouchableOpacity style={styles.mainBtnLogin} onPress={realizarLogin} disabled={email === '' || senha === '' ? 'none' : ''}>
              <Text style={styles.mainBtnText}>Logar</Text>
            </TouchableOpacity>
          }
        </View>

        { // Mostrar erro de login caso a requisição não tenha sucesso
          mensagemErro != '' &&
          <Text style={styles.mainTextError}>{mensagemErro}</Text>
        }
        <View style={styles.mainTextSpace}>
          <TouchableOpacity style={styles.mainBtnCadastro} onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.mainText}>Não tem uma conta? Cadastre-se</Text>
          </TouchableOpacity>

          <Text style={styles.mainTextForget}>Esqueceu sua senha?</Text>
        </View>
      </View>
    </View >
  );
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
    width: 132,
    height: 96,
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
  btnLoginDisabled: {
    width: 230,
    height: 60,
    borderRadius: 5,
    backgroundColor: '#FFC327',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8%',
  },
  mainBtnText: {
    fontSize: 25,
    fontFamily: 'Poppins_700Bold',
    color: '#000000'
  },
  mainTextError: {
    fontSize: 14,
    fontFamily: 'ABeeZee_400Regular',
    color: '#ff0000',
    marginTop: '6%',
  },
  mainTextSpace: {
    marginTop: '8%',
    height: '10%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  mainText: {
    fontSize: 14,
    fontFamily: 'ABeeZee_400Regular',
    color: '#000000',
  },
  mainTextForget: {
    fontSize: 14,
    fontFamily: 'ABeeZee_400Regular',
    color: '#000000',
    marginTop: '5%'
  },
});