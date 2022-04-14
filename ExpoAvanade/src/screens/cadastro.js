import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  TabBar
} from 'react-native';

import api from '../services/api';
//import DatePicker from 'react-native-datepicker';

class Cadastro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idTipoUsuario: 2,
      nomeUsuario: '',
      email: '',
      senha: '',
      dataNascimento: new Date(),
      cpf: '',
      isLoading: false,
      mensagemErro: '',
    };
  }

  finalizarCadastro = async () => {
    try {
      this.setState({ isLoading: true, mensagemErro: '' });
      const resposta = await api.post('/Usuario', {
        idTipoUsuario: this.state.idTipoUsuario,
        nomeUsuario: this.state.nomeUsuario,
        email: this.state.email,
        senha: this.state.senha,
        dataNascimento: this.state.dataNascimento,
        cpf: this.state.cpf,
      });

      if (resposta.status == 201) {
        this.setState({ isLoading: false });
        this.props.navigation.navigate('Login');;
        //console.warn('Cadastrado efetuado com sucesso!');
        //console.warn(resposta)
      }
    } catch (error) {
      this.setState({ isLoading: false, mensagemErro: 'Não foi possível realizar o cadastrado!' });
      //console.warn(error);
      //console.log(error);
    }
  };

  LimparCampos = () => {
    this.setState({
      nomeUsuario: '',
      email: '',
      senha: '',
      dataNascimento: new Date(),
      cpf: '',
    })
  };

  componentDidMount() {
    this.LimparCampos();
  };

  /* convertDate = () => {
    this.setState({
      dataNascimento:
      Intl.DateTimeFormat("pt-BR", {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true
      }).format(new Date(dataNascimento))
    })
  }; */

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
            <Image source={require('../../assets/img/icon_back.png')} style={styles.mainHeaderImage} />
            <Text style={styles.mainHeaderText}>Cadastro</Text>
          </View>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.mainContentForm}>
            <TextInput
              style={styles.mainContentFormInput}
              placeholder='Nome Completo'
              placeholderTextColor='#000000'
              keyboardType="default"></TextInput>
            <TextInput
              style={styles.mainContentFormInput}
              placeholder='CPF'
              placeholderTextColor='#000000'
              keyboardType="default"></TextInput>
            <TextInput
              style={styles.mainContentFormInput}
              placeholder='Endereço de E-mail'
              placeholderTextColor='#000000'
              keyboardType="email-address"></TextInput>
            <TextInput
              style={styles.mainContentFormInput}
              placeholder='Senha'
              placeholderTextColor='#000000'
              keyboardType="default"></TextInput>
            <TextInput
              style={styles.mainContentFormInput}
              placeholder='DD/MM/AAAA'
              placeholderTextColor='#000000'
              keyboardType="default"></TextInput>
            <TextInput
              style={styles.mainContentFormInput}
              placeholder='Foto'
              placeholderTextColor='#000000'
              keyboardType="default"></TextInput>
            <TouchableOpacity style={styles.mainContentFormButton} onPress={this.realizarLogin} disabled={this.state.Email === '' || this.state.Senha === '' ? 'none' : ''}>
              <Text style={styles.mainContentFormButtonText}>Cadastrar</Text>
            </TouchableOpacity>
            <Text style={styles.mainContentFormText}>Você será reenchaminhado para a tela de login</Text>
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
    width: '59%',
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
  mainContent: {
    backgroundColor: '#FFFFFF',
    width: '100%',
    height: '100%',
    // marginTop: '10%'
  },
  mainContentForm: {
    alignItems: 'center'
  },
  mainContentFormInput: {
    backgroundColor: '#FFFFFF',
    width: '70%',
    // height: 60,
    height: '8.5%',
    marginTop: '8%',
    borderColor: '#F3BC2C',
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 20
  },
  mainContentFormButton: {
    // width: 157,
    width: '40%',
    // height: 60,
    height: '8%',
    borderRadius: 5,
    backgroundColor: '#F3BC2C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8%',

  },
  mainContentFormButtonText: {
    fontSize: 25,
    fontFamily: 'IBMPlexMono_700Bold',
    color: '#000000'
  },
  mainContentFormText: {
    fontSize: 14,
    color: '#797979',
    marginTop: '8%'
  },
});
export default Cadastro
