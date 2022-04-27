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
import * as Permissions from 'expo-permissions';
import api from '../services/api';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function CadastroTeste({ navigation }) {
  // The path of the picked image
  const [arquivo, setArquivo] = useState('');
  const [idTipoUsuario] = useState(2);
  const [nomeUsuario, setNomeUsuario] = useState('fernando');
  const [email, setEmail] = useState('fernando@gmail.com');
  const [senha, setSenha] = useState('fernando123');
  const [dataNascimento, setNascimento] = useState('10/10/1999');
  const [cpf, setCpf] = useState('43534');
  const [imagem] = useState(null);
  const [result, setResult] = useState(null);

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

  const CadastrarImgg = async () => {
      /* let Data = new FormData();
      Data.append('idTipoUsuario', idTipoUsuario);
      Data.append('nomeUsuario', nomeUsuario);
      Data.append('email', email);
      Data.append('senha', senha);
      Data.append('dataNascimento', dataNascimento);
      Data.append('cpf', cpf);
      Data.append('imagem', imagem);
      Data.append('arquivo', {
          uri: Platform.OS === 'android' ? result.uri : result.uri.replace('file://', ''),
          type: result.type,
          name: result.uri.replace(/^.*[\\\/]/, '')
      });
      console.warn(Data)
      fetch("http://192.168.3.77:5000/api/Usuario", {
          body: Data,
          method: "post",
          headers: { 'Content-Type': 'multipart/form-data' }
      })
          .then((response) => response.json())
          .then((json) => {
              console.log({ json });
          })
          .catch((err) => {
              console.log({ err });
              console.warn(err)
          }); */
      /* return await fetch('http://192.168.3.77:5000/api/Usuario', {
          method: 'POST',
          body: Data,
          headers: {
              'content-type': 'multipart/form-data',
          },
      }); */
      let data = new FormData();
      data.append('idTipoUsuario', idTipoUsuario);
      data.append('nomeUsuario', nomeUsuario);
      data.append('email', email);
      data.append('senha', senha);
      data.append('dataNascimento', dataNascimento);
      data.append('cpf', cpf);
      data.append('imagem', imagem);
      data.append('arquivo', {  
          uri: arquivo,
          name: 'file',
          type: 'image/jpg'
        })
    
        fetch('http://192.168.3.77:5000/api/Usuario', {  
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
          },
          method: 'POST',
          body: data
        }).then(
          response => {
            console.log('succ ')
            console.log(response)
          }
          ).catch(err => {
          console.log('err ')
          console.log(err)
        } )
  }

  const Cadastrar = async () => {
      try {
          const filename = arquivo.split('/').pop();
          const match = /\.(\w+)$/.exec(filename);
          const type = match ? `image/${match[1]}` : `image`;
          const formData = new FormData()
          formData.append('IdTipoUsuario', idTipoUsuario);
          formData.append('NomeUsuario', nomeUsuario);
          formData.append('Email', email);
          formData.append('Senha', senha);
          formData.append('DataNascimento', dataNascimento);
          formData.append('cpf', cpf);
          formData.append('Imagem', imagem);
          formData.append('arquivo', {
              name: filename,
              type: type,
              uri: arquivo
          });
          console.log(arquivo)
          console.log(formData)

          const resposta = await api.post('/Usuario', formData, {
              headers: { "Content-Type": "multipart/form-data" },
          })

          if (resposta.status == 201) {
              console.warn('Cadastrado realizado!');
              console.warn(resposta)
          }
      } catch (error) {
          console.warn(error);
          console.log(error);
      };

      /*  async function onSubmit() {
           const formData = new FormData()
           formData.append('IdTipoUsuario', idTipoUsuario);
           formData.append('NomeUsuario', nomeUsuario);
           formData.append('Email', email);
           formData.append('Senha', senha);
           formData.append('DataNascimento', dataNascimento);
           formData.append('Cpf', cpf);
           formData.append('Imagem', imagem);
           formData.append('arquivo', {
               name: filename,
               type: type,
               uri: arquivo
           })
       axios({
           method: "post",
           url: "http://192.168.3.115:5000/api/Usuario",
           data: formData,
           headers: { "Content-Type": "multipart/form-data" },
       })
           .then(function (response) {
               console.warn(response);
           })
           .catch(function (response) {
               //handle error
               console.warn(response);
           }); */
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
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
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
          <TouchableOpacity style={styles.mainContentFormInputImage}>
            <Text>Foto</Text>
            <Image source={require('../../assets/img/icon_photo.png')} style={styles.mainHeaderImage} />
          </TouchableOpacity>
          {/* <Image source={{ uri: user.image }} style={{ width: 200, height: 200 }} />
        <Button onPress={pickImage} >Pick an image</Button>
        <Button onPress={onSubmit} >Send</Button> */}
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
          {/* <Text style={styles.mainTextError}>{this.state.mensagemErro}</Text> */}
          {/* <TouchableOpacity style={styles.mainContentFormButton} onPress={this.realizarLogin} disabled={this.state.Email === '' || this.state.Senha === '' ? 'none' : ''}>
            <Text style={styles.mainContentFormButtonText}>Cadastrar</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.mainContentFormButton}>
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

  }
});