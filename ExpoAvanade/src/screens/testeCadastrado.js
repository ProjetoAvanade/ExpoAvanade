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
import axios from 'axios';

import api from '../services/api';
//import DatePicker from 'react-native-datepicker';

/* class TesteCadastrado extends Component {
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

      if (resposta.status == 200) {
        this.setState({ isLoading: false });
        this.props.navigation.navigate('warnin');;
        //console.warn('Cadastrado efetuado com sucesso!');
        //console.warn(resposta)
      }
    } catch (error) {
      this.setState({ isLoading: false, mensagemErro: 'Não foi possível realizar o cadastrado!' });
      //console.warn(error);
      //console.warn(error);
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
  }; */

export const TesteCadastrado = () => {

    // Cadastrar
    const [idTipoUsuario] = useState(2);
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [imagem] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [dataNascimento, setDataNascimento] = useState(new Date());
    const [CPF, setCPF] = useState('');

    // Listar
    //const [produtos, setProdutos] = useState([]);


    const Cadastrar = (event) => {

        event.preventDefault();

        var formData = new FormData();

        const target = document.getElementById('arquivo')
        const file = target.files[0]
        formData.append('arquivo', file, file.name)

        formData.append('id', 0);
        formData.append('idTipoUsuario', idTipoUsuario);
        formData.append('imagem', imagem);
        formData.append('nomeUsuario', nomeUsuario);
        formData.append('email', email);
        formData.append('senha', senha);
        formData.append('dataNascimento', dataNascimento);
        formData.append('CPF', CPF);
        formData.append('arquivo', arquivo);

        axios({
            method: "post",
            url: "http://192.168.3.115:5000/api/Usuario",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                console.warn(response);
                /*  Listar(); */
            })
            .catch(function (response) {
                //handle error
                console.warn(response);
            });
    }

    console.warn(nomeUsuario)

    /* const Listar = () => {
        axios.get('http://192.168.3.115:5000/api/Usuario')
            .then(resposta => {
                setProdutos(resposta.data);
            })
            .catch(erro => console.warn(erro))
    } */

    /* useEffect(() => {
        Listar();
    }, []); */


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
                        <Image source={require('../../assets/img/Icone_voltar.png')} style={styles.mainHeaderImage} />
                    </TouchableOpacity>
                    <Text style={styles.mainHeaderText}>Cadastro</Text>
                </View>
            </View>

            <View style={styles.mainContent}>
                <View style={styles.mainContentForm}>
                    <TextInput
                        style={styles.mainContentFormInput}
                        placeholder='Nome Completo'
                        placeholderTextColor='#000000'
                        keyboardType="default"
                        value={nomeUsuario}
                        onChange={ (campo) => setNomeUsuario('nomeUsuario', campo.target.value) }>
                    </TextInput>
                    <TextInput
                        style={styles.mainContentFormInput}
                        placeholder='CPF'
                        placeholderTextColor='#000000'
                        keyboardType="default"
                        onChangeText={CPF => setCPF('CPF', CPF)}>
                    </TextInput>
                    <TextInput
                        style={styles.mainContentFormInput}
                        placeholder='Endereço de E-mail'
                        placeholderTextColor='#000000'
                        keyboardType="email-address"
                        onChangeText={email => setEmail('email', email)}>
                    </TextInput>
                    <TextInput
                        style={styles.mainContentFormInput}
                        placeholder='Senha'
                        placeholderTextColor='#000000'
                        keyboardType="default"
                        onChangeText={senha => setSenha('senha', senha)}>
                    </TextInput>
                    <TextInput
                        style={styles.mainContentFormInput}
                        placeholder='DD/MM/AAAA'
                        placeholderTextColor='#000000'
                        keyboardType="default"
                        onChangeText={dataNascimento => setDataNascimento('dataNascimento', dataNascimento)}>
                    </TextInput>
                    <TextInput
                        style={styles.mainContentFormInput}
                        placeholder='Foto'
                        placeholderTextColor='#000000'
                        keyboardType="default"
                        >
                    </TextInput>

                    <TouchableOpacity style={styles.mainContentFormButton} onPress={Cadastrar}>
                        <Text style={styles.mainContentFormButtonText}>Cadastrar</Text>
                    </TouchableOpacity>

                    {/* {
                        this.state.isLoading === false &&
                        <TouchableOpacity style={styles.mainContentFormButton} onPress={Cadastrar}>
                            <Text style={styles.mainContentFormButtonText}>Cadastrar</Text>
                        </TouchableOpacity>
                    }

                    {
                        this.state.isLoading === true &&
                        <TouchableOpacity style={styles.mainContentFormButton} disabled>
                            <Text style={styles.mainContentFormButtonText}>Carregando</Text>
                        </TouchableOpacity>
                    } */}
                    <Text style={styles.mainContentFormText}>Você será reenchaminhado para a tela de login</Text>
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
        marginTop: '8%',
        fontFamily: 'ABeeZee_400Regular',

    },
});

export default TesteCadastrado