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
  LogBox,
  Dimensions
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import MaskInput, { Masks } from 'react-native-mask-input'
import DatePicker from 'react-native-datepicker';
import { Formik } from 'formik'
import * as yup from 'yup'

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
    //console.log(result);

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
      /* console.log(formData)
      console.log(resposta) */
    } else {
      setSucess(false);
      setIsLoading(false);
      /* console.warn(formData)
      console.warn(resposta) */
    }
  }

  const signInValidationSchema = yup.object().shape({
    nomeUsuario: yup
      .string()
      .min(3, ({ min }) => `Nome precisa ter no minímo ${min} caracteres`)
      .required('Nome é obrigatório'),
    email: yup
      .string()
      .email("Digite um E-mail válido")
      .required('E-mail é obrigatório'),
    senha: yup
      .string()
      .matches(/\w*[a-z]\w*/, "Senha precisa ter uma letra minúsculas")
      .matches(/\w*[A-Z]\w*/, "Senha precisa ter uma letra maiúsculas")
      .matches(/\d/, "Senha precisa ter um número")
      .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Senha precisa ter um caractere especial")
      .min(8, ({ min }) => `Senha precisa ter no minímo ${min} caracteres`)
      .required('Senha é obrigatória'),
    senhaConfirmar: yup
      .string()
      .required('Confirmar a senha é obrigatório'),
  })

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
          <Formik
            validationSchema={signInValidationSchema}
            initialValues={{ nomeUsuario: '', email: '', senha: '', senhaConfirmar: '' }}
            onSubmit={Cadastrar}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
              values,
              errors,
              isValid,
            }) => (
              <>
                <TextInput
                  style={styles.mainContentFormInput}
                  placeholder='Nome'
                  placeholderTextColor='#000000'
                  maxLength={20}
                  onChangeText={handleChange('nomeUsuario')}
                  setFieldValue={setNomeUsuario(values.nomeUsuario)}
                  onBlur={handleBlur('nomeUsuario')}
                  value={values.nomeUsuario}
                />
                {errors.nomeUsuario &&
                  <Text style={styles.erroInput}>{errors.nomeUsuario}</Text>
                }

                <MaskInput
                  style={styles.mainContentFormInput}
                  placeholder='CPF'
                  placeholderTextColor='#000000'
                  keyboardType="numeric"
                  value={cpf}
                  onChangeText={(masked, unmasked, obfuscated) => setCpf(unmasked)}
                  mask={Masks.BRL_CPF}
                />

                <TextInput
                  style={styles.mainContentFormInput}
                  placeholder='E-mail'
                  placeholderTextColor='#000000'
                  maxLength={40}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  setFieldValue={setEmail(values.email)}
                  keyboardType="email-address"
                />
                {errors.email &&
                  <Text style={styles.erroInput}>{errors.email}</Text>
                }

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
                  onDateChange={(date) => setNascimento(date)}
                />

                <TextInput
                  style={styles.mainContentFormInput}
                  placeholder='Senha'
                  placeholderTextColor='#000000'
                  keyboardType="default"
                  secureTextEntry={true}
                  passwordRules
                  maxLength={15}
                  onChangeText={handleChange('senha')}
                  onBlur={handleBlur('senha')}
                  setFieldValue={setSenha(values.senha)}
                  value={values.senha}
                />
                {errors.senha &&
                  <Text style={styles.erroInput}>{errors.senha}</Text>
                }

                {errors.senhaConfirmar &&
                  <Text style={styles.erroInput}>{errors.senhaConfirmar}</Text>
                }
                
                <View style={styles.mainContentPasswordConfirm}>
                  <TextInput
                    style={styles.mainInputConfirm}
                    placeholder='Confirmar Senha'
                    placeholderTextColor='#000000'
                    keyboardType="default"
                    secureTextEntry={true}
                    passwordRules
                    /* value={senhaConfirmar}
                    maxLength={15}
                    onChangeText={(senhaConfirmar) => setSenhaConfirmar(senhaConfirmar)} */
                    onChangeText={handleChange('senhaConfirmar')}
                    onBlur={handleBlur('senhaConfirmar')}
                    value={values.senhaConfirmar}
                    setFieldValue={setSenhaConfirmar(values.senhaConfirmar)}
                  />

                  {values.senha != values.senhaConfirmar &&
                    //Com o input de confirmação de senha é possui o usuário perceber senha digitadas diferentes
                    <Image source={require('../../assets/img/error_password.png')} style={styles.mainImagePassword} />
                  }

                  {values.senha == values.senhaConfirmar &&
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
                  <TouchableOpacity style={styles.mainContentFormButton} onPress={handleSubmit} disabled={!isValid}>
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
              </>
            )}
          </Formik>
          {/* <TextInput
            style={styles.mainContentFormInput}
            placeholder='Nome'
            placeholderTextColor='#000000'
            value={nomeUsuario}
            maxLength={20}
            onChangeText={(nomeUsuario) => setNomeUsuario(nomeUsuario)}
          />

          <MaskInput
            style={styles.mainContentFormInput}
            placeholder='CPF'
            placeholderTextColor='#000000'
            keyboardType="numeric"
            value={cpf}
            onChangeText={(masked, unmasked, obfuscated) => setCpf(unmasked)}
            mask={Masks.BRL_CPF}
          />

          <TextInput
            style={styles.mainContentFormInput}
            placeholder='E-mail'
            placeholderTextColor='#000000'
            value={email}
            maxLength={40}
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
            onDateChange={(date) => setNascimento(date)}
          />

          <TextInput
            style={styles.mainContentFormInput}
            placeholder='Senha'
            placeholderTextColor='#000000'
            keyboardType="default"
            secureTextEntry={true}
            passwordRules
            value={senha}
            maxLength={15}
            onChangeText={(senha) => setSenha(senha)}
          />

          <View style={styles.mainContentPasswordConfirm}>
            <TextInput
              style={styles.mainInputConfirm}
              placeholder='Confirmar Senha'
              placeholderTextColor='#000000'
              keyboardType="default"
              secureTextEntry={true}
              passwordRules
              value={senhaConfirmar}
              maxLength={15}
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
          } */}

          { //Mensagem de cadastro concluído e redirecionando para tela de login
            sucess == true && setTimeout(() => navigation.navigate('Login'), 2000) &&
            <Text style={styles.mainTextSucess}>Cadastro realizado com sucesso!</Text>
          }
        </View>
      </View>
    </View >
  );
}

LogBox.ignoreLogs(['Warning: componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.']);
LogBox.ignoreLogs(["DatePickerAndroid has been merged with DatePickerIOS and will be removed in a future release. It can now be installed and imported from '@react-native-community/datetimepicker' instead of 'react-native'. See https://github.com/react-native-datetimepicker/datetimepicker"]);
LogBox.ignoreLogs(["Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`"]);

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  mainGap: {
    height: '2.5%',
  },
  mainHeader: {
    width: '100%',
    height: '7.6%',
    backgroundColor: '#F3BC2C',
    justifyContent: 'center',
  },
  mainHeaderSpace: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginRight: '27%',
  },
  mainHeaderImage: {
    width: 25,
    height: 21.56,
    marginRight: '10%'
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
  mainInputConfirm: {
    backgroundColor: '#FFFFFF',
    width: '70%',
    height: 50,
    marginTop: '8%',
    borderColor: '#F3BC2C',
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 20,
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
  mainInputError: {
    fontSize: 14,
    fontFamily: 'ABeeZee_400Regular',
    color: '#ff0000',
    marginTop: '3%',
  },
  mainTextSucess: {
    fontSize: 16,
    fontFamily: 'ABeeZee_400Regular',
    color: '#06D106',
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
  erroInput: {
    fontSize: 13,
    fontFamily: 'ABeeZee_400Regular',
    color: '#ff0000',
    justifyContent: 'center'
  }
});
