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
  const [idTipoUsuario, setTipoUsuario] = useState(2);
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [email, setEmail] = useState('sla@gmaill.com');
  const [senha, setSenha] = useState('sla1234');
  const [dataNascimento, setNascimento] = useState(new Date());
  const [Cpf, setCpf] = useState('12');

  /* const options = {
    title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    },
  }

  const abrirGaleria = async () => {
    const images = await launchImageLibrary(options);
    console.warn(images)
  } */

  const pickImage = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        const a = result.uri;
      }
    }


    //if (!result.cancelled) {
      //setUser({'image' : result.uri});
    //}

  };

  function onSubmit() {

    let formData = new FormData();

    formData.append('name', user.name);
    formData.append('groupId', user.group);
    formData.append('groupId', user.group);
    formData.append('groupId', user.group);
    formData.append('groupId', user.group);

    // Infer the type of the image
    if (user.image) {
      let fileName = user.image.split('/').pop();
      let match = /\.(\w+)$/.exec(fileName);
      let fileType = match ? `image/${match[1]}` : `image`;
      formData.append('image', {
        uri: Platform.OS === 'android' ? user.image : user.image.replace('file://', ''),
        name: user.name,
        type: fileType,
      });
    }

    api.post('/Usuario', formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      }
    })
      .then(res => {
        console.log('SUCCESS');
        // ...
      })
      .catch(error => {
        console.log(error);
        // ...  
      });
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
            value={Cpf}
            onChangeText={(Cpf) => setCpf(Cpf)}
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
          <TextInput 
            style={styles.mainContentFormInput}
            placeholder='Foto'
            placeholderTextColor='#000000'
            keyboardType="default"
          />
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
});

/* import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Button,
} from 'react-native';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const options = {
    title: 'Select Image',
    type: 'library',
    options: {
        maxHeight: 200,
        maxWidth: 200,
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
    },
}

const CadastroImg = () => {
    const abrirGaleria = async () => {
        const images = await launchImageLibrary(options);
        console.warn(images)
    }

    return (
        <View>
            <Button title='upload' onPress={abrirGaleria}></Button>
        </View >
    );
};

export default CadastroImg */

/* import React from "react";
import { Button, PermissionsAndroid, StatusBar, StyleSheet, Text, View } from "react-native";

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

const Authorization = () => (
  <View style={styles.container}>
    <Text style={styles.item}>Try permissions</Text>
    <Button title="request permissions" onPress={requestCameraPermission} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default App; */