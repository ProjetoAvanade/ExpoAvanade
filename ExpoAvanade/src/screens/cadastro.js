import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import api from '../services/api';

export default function Cadastro({ navigation }) {
  const [idTipoUsuario] = useState(2);
  const [nomeUsuario, setNomeUsuario] = useState('algm');
  const [email, setEmail] = useState('aglm@gmail.com');
  const [senha, setSenha] = useState('algu7171');
  const [dataNascimento, setNascimento] = useState('11/11/2011');
  const [cpf, setCpf] = useState('111192928');
  const [imagem] = useState(true);
  const [arquivo, setArquivo] = useState('');
  const [result, setResult] = useState('');
  const [sucess, setSucess] = useState();

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library 
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Você recusou a permissão de acesso a galeria!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setArquivo(result.uri);
      setResult(result);
      console.log(result.uri);
    }
  }

  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Você recusou a permissão de acesso a câmera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setArquivo(result.uri);
      setResult(result);
      console.log(result.uri);
    }
  }

  /* const Cadastrar = async () => {
    const filename = arquivo.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;
    let formData = new FormData();
    formData.append('idTipoUsuario', idTipoUsuario);
    formData.append('nomeUsuario', nomeUsuario);
    formData.append('email', email);
    formData.append('senha', senha);
    formData.append('dataNascimento', dataNascimento);
    formData.append('cpf', cpf);
    formData.append('imagem', imagem);
    formData.append('arquivo', {
      uri: arquivo, name: filename, type: 'image'
    })
    //fetch('http://192.168.4.187:5000/api/Usuario', {
    fetch('http://192.168.15.11:5000/api/Usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData,
    }).then(response => {
      setSucess(true)
      console.log('Usuario Cadastrado')
    }).catch(erro => {
      setSucess(false)
      console.log(erro)
      console.log(formData)
    })
  } */
  
  /* uri: Platform.OS === 'android' ? result.uri : result.uri.replace('file://', ''),
  type: result.type,
  name: result.uri.replace(/^.*[\\\/]/, '') */
  const Cadastrar = async () => {
    const filename = arquivo.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;
    let formData = new FormData();
    formData.append('idTipoUsuario', idTipoUsuario);
    formData.append('nomeUsuario', nomeUsuario);
    formData.append('email', email);
    formData.append('senha', senha);
    formData.append('dataNascimento', dataNascimento);
    formData.append('cpf', cpf);
    formData.append('imagem', imagem);
    formData.append('arquivo', {
      uri: arquivo, name: filename, type: type
    })
    fetch('http://192.168.15.11:5000/api/Usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData,
    }).then(response => {
      console.log('Usuario Cadastrado')
      setSucess(true)
    }).catch(erro => {
      console.log(erro)
      setSucess(false)
    })
  }

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
          <Text style={styles.mainHeaderText}>Cadastro</Text>
        </View>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.mainContentForm}>
          <TextInput
            style={styles.mainContentFormInput}
            placeholder='Nome Completo'
            placeholderTextColor='#000000'
            value={nomeUsuario}
            onChangeText={(nomeUsuario) => setNomeUsuario(nomeUsuario)}
          />
          <TextInput
            style={styles.mainContentFormInput}
            placeholder='CPF'
            placeholderTextColor='#000000'
            value={cpf}
            onChangeText={(cpf) => setCpf(cpf)}
          />
          <TextInput
            style={styles.mainContentFormInput}
            placeholder='Endereço de e-mail'
            placeholderTextColor='#000000'
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            style={styles.mainContentFormInput}
            placeholder='Senha'
            placeholderTextColor='#000000'
            keyboardType="default"
            secureTextEntry={true}
            passwordRules
            value={senha}
            onChangeText={(senha) => setSenha(senha)}
          />
          <TextInput
            style={styles.mainContentFormInput}
            placeholder='AAAA/MM/DD'
            placeholderTextColor='#000000'
            value={dataNascimento}
            onChangeText={(dataNascimento) => setNascimento(dataNascimento)}
          />
          <TouchableOpacity style={styles.mainContentFormInputImage} onPress={showImagePicker}>
            <Text>Foto</Text>
            <Image source={require('../../assets/img/icon_photo.png')} style={styles.mainHeaderImage} />
          </TouchableOpacity>
          {/* {
            this.state.isLoading === false &&
            <TouchableOpacity style={styles.mainBtnRegister}>
              <Text style={styles.mainBtnText}>Cadastrar</Text>
            </TouchableOpacity>
          }
          {
            this.state.isLoading === true &&
            <TouchableOpacity style={styles.mainBtnRegister} disabled>
              <Text style={styles.mainBtnText}>Carregando</Text>
            </TouchableOpacity>
          } */}
          <View style={styles.imageContainer}>
            {
              arquivo !== '' && <Image
                source={{ uri: arquivo }}
                style={styles.image}
              />
            }
          </View>

          {sucess == false &&
            <Text style={styles.mainTextError}>Não foi possível realizar o cadastro!</Text>
          }

          {sucess == true &&
            <Text style={styles.mainTextSucess}>Cadastro realizado com sucesso!</Text>
          }

          <TouchableOpacity style={styles.mainContentFormButton} onPress={Cadastrar}>
            <Text style={styles.mainContentFormButtonText}>Cadastrar</Text>
          </TouchableOpacity>

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
  mainContentFormInputImage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3BC2C',
    width: '70%',
    // height: 60,
    height: '8.5%',
    marginTop: '8%',
    borderRadius: 5,
    paddingLeft: 20,
    paddingRight: 20
  },
  imageContainer: {
    padding: 10
  },
  image: {
    width: 20,
    height: 20,
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