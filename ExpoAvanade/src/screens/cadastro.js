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
    };
  }

  goBack = () => {
    this.props.navigation.goBack();
  }

  finalizarCadastro = async () => {
    try {
      const resposta = await api.post('/Usuario', {
        idTipoUsuario: this.state.idTipoUsuario,
        nomeUsuario: this.state.nomeUsuario,
        email: this.state.email,
        senha: this.state.senha,
        dataNascimento: this.state.dataNascimento,
        cpf: this.state.cpf,
      });

      //this.setState({ isLoading: false });

      if (resposta.status == 200) {
        this.props.navigation.navigate('Login');;
        //console.warn('Login efetuado com sucesso!');
        console.warn(resposta)
      }
    } catch (error) {
      console.warn(error);
      console.log(error);
      /* this.setState({ isLoading: false, mensagemErro: "Erro" }); */
    }
  };

  LimparCampos = () => {
    this.setState({
      nomeUsuario: '',
      email: '',
      senha: '',
      dataNascimento: new Date(),
      cpf: 0,
    })
  };

  componentDidMount() {
    this.LimparCampos();
  };

  render() {
    return (
      <View style={styles.main}>
        <View style={styles.mainDiv}>

          <View style={styles.mainTituloSpace}>
            <TouchableOpacity style={styles.mainBtnVoltar} onPress={this.goBack}>
              <Image style={styles.mainImagem} source={require('../../assets/img/Icone_voltar.png')} />
            </TouchableOpacity>
            <Text style={styles.mainTitulo}>Cadastro</Text>
          </View>

          <View style={styles.mainFormSpace}>
            <TextInput
              style={styles.mainInput}
              placeholder='Nome Completo'
              placeholderTextColor='#000000'
              onChangeText={nomeUsuario => this.setState({ nomeUsuario })}
            />
            <TextInput
              style={styles.mainInput}
              placeholder='CPF'
              placeholderTextColor='#000000'
              onChangeText={cpf => this.setState({ cpf })}
            />
            <TextInput
              style={styles.mainInput}
              placeholder='Endereço de e-mail'
              placeholderTextColor='#000000'
              keyboardType="email-address"
              onChangeText={email => this.setState({ email })}
            />
            <TextInput
              style={styles.mainInput}
              placeholder='Senha'
              placeholderTextColor='#000000'
              keyboardType="default"
              secureTextEntry={true}
              passwordRules
              onChangeText={senha => this.setState({ senha })}
            />
            <TextInput
              style={styles.mainInput}
              placeholder='DD/MM/AAAA'
              placeholderTextColor='#000000'
              onChangeText={dataNascimento => this.setState({ dataNascimento })}
            />
            {/* <DatePicker
              style={styles.mainInput}
              date={this.state.dataNascimento}
              mode="date"
              placeholder="select date"
              format="DD/MM/YYYY"
              minDate="01-01-1900"
              maxDate="01-01-2000"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  right: -5,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  borderColor: "gray",
                  alignItems: "flex-start",
                  borderWidth: 0,
                  borderBottomWidth: 1,
                },

                placeholderText: {
                  fontSize: 17,
                  color: "gray"
                },

                dateText: {
                  fontSize: 17,
                }
              }}
              onChangeText={dataNascimento => this.setState({ dataNascimento })}
            /> */}
            <TouchableOpacity style={styles.mainBtn} onPress={this.finalizarCadastro}>
              <Text style={styles.mainBtnTexto}>Cadastrar</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mainTextoSpace}>
            <Text style={styles.mainTexto}>Você será reencaminhado para a tela de login.</Text>
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
    flex: 0.9,
    backgroundColor: 'white',
    height: 517,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  mainTituloSpace: {
    width: 203,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 55,
  },
  mainImagem: {
    marginTop: 15,
    width: 20,
    height: 20,
  },
  mainTitulo: {
    fontSize: 36,
    color: '#000000',
  },
  mainFormSpace: {
    marginTop: 25,
    height: 490,
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

  mainBtnVoltar: {
    width: 20,
    height: 20,
  },

  mainBtnTexto: {
    fontFamily: 'IBMPlexMono-Bold',
    fontSize: 14,
    color: '#000000'
  },
  mainTextoSpace: {
    marginTop: 20,
    height: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainTexto: {
    fontFamily: 'ABeeZee-Regular',
    fontSize: 14,
    color: '#000000'
  },
});

export default Cadastro