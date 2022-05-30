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
import { MaskedTextInput } from 'react-native-mask-text';
import DatePicker from 'react-native-datepicker';

export default function Cadastro({ navigation }) {
  const [idTipoUsuario] = useState(2);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirmar, setSenhaConfirmar] = useState('');
  const [dataNascimento, setNascimento] = useState();
  const [cpf, setCpf] = useState('');
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
  } */

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
    const resposta = await fetch('https://api-avanade.azurewebsites.net/api/usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: formData,
    })
    if (resposta.status == 201) {
      setSucess(true);
      setIsLoading(false);
    } else {
      setSucess(false);
      setIsLoading(false);
    }
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
          {/* <MaskedTextInput
            mask="999.999.999-99"
            style={styles.mainContentFormInput}
            placeholder='CPF'
            placeholderTextColor='#000000'
            keyboardType="numeric"
            onChangeText={(text, rawText) => {
              setCpf(rawText)
            }}
          /> */}
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
          <DatePicker
            date={dataNascimento}
            mode="date"
            format="DD/MM/YYYY"
            minDate="01-01-1900"
            maxDate="29-05-2004"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            style={styles.mainContentFormInput}
            placeholder='DD/MM/AAAA'
            placeholderTextColor='#000000'
            customStyles={{
              dateInput: {
                borderWidth: 0,
                borderBottomWidth: 0,
              },
              dateIcon: {
                position: 'absolute',
                right: 10,
                marginLeft: 0,
              },
              placeholderText: {
                fontSize: 14,
                color: "#000",
                marginRight: '62%'
              },
              dateText: {
                fontSize: 14,
                color: "#000",
                marginRight: '68%',
              }
            }}
            onDateChange={(date) => {
              setNascimento(date);
            }}
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

          <View style={styles.mainContentPasswordConfirm}>
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
              <Image source={require('../../assets/img/error_password.png')} style={styles.mainImagePassword} />
            }

            {senha == senhaConfirmar &&
              //Com o input de confirmação de senha é possui o usuário perceber senha digitadas iguais
              <Image source={require('../../assets/img/confirm_password.png')} style={styles.mainImagePassword} />
            }
          </View>

          <TouchableOpacity style={styles.mainContentFormInputImage} onPress={showImagePicker}>
            <Text>Foto</Text>
            { // Renderizar a imagem escolhida pelo usuário
              arquivo !== '' && <Image source={{ uri: arquivo }} style={styles.image} />
            }

            { // Caso o usuário ainda não tenha escolhido a imagem, renderizar ícone de câmera 
              arquivo == '' && <Image source={require('../../assets/img/icon_photo.png')} style={styles.mainHeaderImage} />
            }
          </TouchableOpacity>

          { // Caso seja false, renderiza o botão habilitado com o texto 'Cadastrar'
            isLoading === false &&
            <TouchableOpacity style={styles.mainContentFormButton} onPress={Cadastrar}
              disabled={nomeUsuario == '' || senha == '' || senhaConfirmar == '' || email == '' || dataNascimento == null || cpf == '' || arquivo == '' ? 'none' : ''}>
              <Text style={styles.mainContentFormButtonText}>Cadastrar</Text>
            </TouchableOpacity>
          }

          { // Caso seja true, renderiza o botão desabilitado com o texto 'Carregando...'
            isLoading === true && <TouchableOpacity style={styles.buttonDisabled} disabled>
              <Text style={styles.mainContentFormButtonText}>Carregando...</Text>
            </TouchableOpacity>
          }

          { //Mensagem de cadastro inválido
            sucess == false &&
            <Text style={styles.mainTextError}>Não foi possível realizar o cadastro, por favor revise as informações!</Text>
          }

          { //Mensagem de cadastro concluído e redirecionando para tela de login
            sucess == true && setTimeout(() => navigation.navigate('Login'), 1500) &&
            <Text style={styles.mainTextSucess}>Cadastro realizado com sucesso!</Text>
          }
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
    height: '4%',
  },
  mainHeader: {
    width: '100%',
    height: '7.6%',
    backgroundColor: '#F3BC2C',
    justifyContent: 'center',
  },
  mainHeaderSpace: {
    width: '59%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
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
  },
  mainContentForm: {
    alignItems: 'center'
  },
  mainContentFormInput: {
    backgroundColor: '#FFFFFF',
    width: '70%',
    height: 50,
    marginTop: '8%',
    borderColor: '#F3BC2C',
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 20
  },
  mainContentFormButton: {
    width: '50%',
    height: '8%',
    borderRadius: 5,
    backgroundColor: '#F3BC2C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '8%',
  },
  buttonDisabled: {
    width: '55%',
    height: '8%',
    borderRadius: 5,
    backgroundColor: '#FFC327',
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
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  mainTextError: {
    fontSize: 14,
    fontFamily: 'ABeeZee_400Regular',
    color: '#ff0000',
    marginTop: '3%',
    textAlign: 'center',
    maxWidth: '70%'
  },
  mainTextSucess: {
    fontSize: 14,
    fontFamily: 'ABeeZee_400Regular',
    color: '#00ff00',
    marginTop: '3%'
  },
  mainContentPasswordConfirm: {
    width: '110%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 35
  },
  mainImagePassword: {
    height: 30,
    width: 30,
    marginTop: '7%',
    marginLeft: '2%'
  },
});
