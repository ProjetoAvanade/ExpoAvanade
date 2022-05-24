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
  const [senhaConfirmar, setSenhaConfirmar] = useState('algu7171');
  const [dataNascimento, setNascimento] = useState('11/11/2011');
  const [cpf, setCpf] = useState('111192928');
  const [imagem] = useState(true);
  const [arquivo, setArquivo] = useState('');
  const [sucess, setSucess] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // Aciona a função feita com a biblioteca ImagePicker para acessar a galeria
  const showImagePicker = async () => {
    // Pede ao usuário o acesso a galeria
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Você recusou a permissão de acesso a galeria!");
      return;
    }

    // Abre a galeria, o usuário poderá escolher a foto
    const result = await ImagePicker.launchImageLibraryAsync();
    console.log(result);

    if (!result.cancelled) {
      // Conseguir a uri da imagem no celular
      setArquivo(result.uri);
      //setResult(result);
      //console.log(result.uri);
    }
  }

  /* // Função feita com a biblioteca ImagePicker para acessar a câmera
  const openCamera = async () => {
    // Pede ao usuário o acesso a galeria
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Você recusou a permissão de acesso a câmera!");
      return;
    }
    
    // Abre a câmera, o usuário poderá tirar a foto
    const result = await ImagePicker.launchCameraAsync();
    console.log(result);

    if (!result.cancelled) {
      // Conseguir a uri da imagem no celular
      setArquivo(result.uri);
      //setResult(result);
      //console.log(result.uri);
    }
  }
 */
  const Cadastrar = async () => {
    setIsLoading(true);

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
    fetch('https://api-avanade.azurewebsites.net/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData,
    }).then(response => {
      //console.log('Usuario Cadastrado');
      console.log(formData)
      setSucess(true);
      setIsLoading(false);
    }).catch(erro => {
      console.log(erro);
      setIsLoading(false);
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
            placeholder='Confirmar Senha'
            placeholderTextColor='#000000'
            keyboardType="default"
            secureTextEntry={true}
            passwordRules
            value={senhaConfirmar}
            onChangeText={(senhaConfirmar) => setSenhaConfirmar(senhaConfirmar)}
          />

          {senha != senhaConfirmar &&
            //Com o input de confirmação de senha é possui o usuário perceber senha digitadas diferentes
            <Text style={styles.mainTextError}>Senha diferente!</Text>
          }

          {senha == senhaConfirmar &&
            //Com o input de confirmação de senha é possui o usuário perceber senha digitadas iguais
            <Text style={styles.mainTextSucess}>Senha iguais!</Text>
          }

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

          <View style={styles.imageContainer}>
            {
              arquivo !== '' && <Image
                source={{ uri: arquivo }}
                style={styles.image}
              />
            }
          </View>

          {sucess == false &&
            //Mensagem de cadastro invélido
            <Text style={styles.mainTextError}>Não foi possível realizar o cadastro!</Text>
          }

          {sucess == true &&
            //Mensagem de cadastro concluído
            <Text style={styles.mainTextSucess}>Cadastro realizado com sucesso!</Text>
          }

          {
            // Caso seja false, renderiza o botão habilitado com o texto 'Cadastrar'
            isLoading === false &&
            <TouchableOpacity style={styles.mainContentFormButton} onPress={Cadastrar} disabled={
              nomeUsuario == '' || senha == '' || email == '' || dataNascimento == null || cpf == '' || arquivo == '' ? 'none' : ''}>
              <Text style={styles.mainContentFormButtonText}>Cadastrar</Text>
            </TouchableOpacity>
          }

          {
            // Caso seja true, renderiza o botão desabilitado com o texto 'Carregando...'
            isLoading === true && <TouchableOpacity style={styles.mainContentFormButton} disabled>
              <Text style={styles.mainContentFormButtonText}>Carregando...</Text>
            </TouchableOpacity>
          }

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
    fontFamily: 'Poppins_700Bold',
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
    fontFamily: 'Poppins_700Bold',
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
