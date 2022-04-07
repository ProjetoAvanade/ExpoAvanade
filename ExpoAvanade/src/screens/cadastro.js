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
        <View style={styles.mainDiv}>

          <View style={styles.mainTitleSpace}>
            <TouchableOpacity style={styles.mainBtnBack} onPress={() => this.props.navigation.goBack()}>
              <Image style={styles.mainImage} source={require('../../assets/img/Icone_voltar.png')} />
            </TouchableOpacity>
            <Text style={styles.mainTitle}>Cadastro</Text>
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
              placeholder='AAAA/MM/DD'
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
            />*/}
            {
              this.state.isLoading === false &&
              <TouchableOpacity style={styles.mainBtnRegister} onPress={this.finalizarCadastro}>
                <Text style={styles.mainBtnText}>Cadastrar</Text>
              </TouchableOpacity>
            }

            {
              this.state.isLoading === true &&
              <TouchableOpacity style={styles.mainBtnRegister} disabled>
                <Text style={styles.mainBtnText}>Carregando</Text>
              </TouchableOpacity>
            }

            <Text style={styles.mainTextError}>{this.state.mensagemErro}</Text>
          </View>

          <View style={styles.mainTextSpace}>
            <Text style={styles.mainText}>Você será reencaminhado para a tela de login.</Text>
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
    justifyContent: 'center'
  },
  mainDiv: {
    flex: 0.85,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  mainTitleSpace: {
    width: 220,
    height: 60,
    marginRight: 65,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  mainImage: {
    marginTop: 8,
    marginLeft: 10,
    width: 20,
    height: 20,
  },
  mainTitle: {
    marginTop: 10,
    marginLeft: 45,
    fontSize: 36,
    color: '#000000',
    fontFamily: 'IBMPlexMono_700Bold',
  },
  mainFormSpace: {
    height: 510,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainInput: {
    width: 260,
    height: 60,
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 23,
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderColor: '#F3BC2C',
    marginTop: '8%',
  },
  mainBtnRegister: {
    width: 157,
    height: 60,
    borderRadius: 5,
    backgroundColor: '#F3BC2C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8%',

  },
  mainBtnBack: {
    width: 20,
    height: 20,
  },
  mainBtnText: {
    fontSize: 25,
    fontFamily: 'IBMPlexMono_700Bold',
    color: '#000000'
  },
  mainTextSpace: {
    marginTop: 30,
    height: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainText: {
    fontSize: 14,
    fontFamily: 'ABeeZee_400Regular',
    color: '#000000'
  },
  mainTextError:{
    fontSize: 14,
    color: 'red',
    marginTop: '2%',
  }
});

export default Cadastro
