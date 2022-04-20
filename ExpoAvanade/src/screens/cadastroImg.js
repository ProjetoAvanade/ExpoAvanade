import React, { useState, useRef, useEffect } from 'react';
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
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

export default function CadastroImg({ navigation }) {
  const [idTipoUsuario] = useState(2);
  const [nomeUsuario, setNomeUsuario] = useState('fsfs');
  const [email, setEmail] = useState('sfsfs');
  const [senha, setSenha] = useState('fsfsf');
  const [dataNascimento, setNascimento] = useState('2002-11-20');
  const [cpf, setCpf] = useState('4353');
  const [imagem] = useState(null);
  const [arquivo, setArquivo] = useState();

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
  } 
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }

  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setImagem(newPhoto);
  };

  if (arquivo) {
    let sharePic = () => {
      shareAsync(arquivo.uri).then(() => {
        setImagem(undefined);
      });
    };

    let savePhoto = () => {
      MediaLibrary.saveToLibraryAsync(arquivo.uri).then(() => {
        setImagem(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
{/*         <Image style={styles.preview} source={{ uri: "data:image/jpg;" + arquivo }} /> *
        <Image style={styles.preview} source={{ uri: "http://localhost:5000/StaticFiles/Images/"+arquivo}} />
        <Button title="Share" onPress={sharePic} />
        {hasMediaLibraryPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
        <Button title="Discard" onPress={() => setImagem(undefined)} />
      </SafeAreaView>
    );
  }

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
        setImagem({'arquivo' : result.uri})
      }
    }
  }

  //if (!result.cancelled) {
  //setUser({'image' : result.uri});
  //}


  function onSubmit() {

    let formData = new FormData();

    formData.append('IdTipoUsuario', idTipoUsuario);
    formData.append('NomeUsuario', nomeUsuario);
    formData.append('Email', email);
    formData.append('Senha', senha);
    formData.append('DataNascimento', dataNascimento);
    formData.append('Cpf', cpf);
    formData.append('Imagem', imagem);
    formData.append('arquivo', arquivo);
    /* formData.append('arquivo', file, file.name) */

  // Infer the type of the image
  /* if (arquivo) {
    let fileName = image.split('/').pop();
    let match = /\.(\w+)$/.exec(fileName);
    let fileType = match ? `image/${match[1]}` : `image`;
    formData.append('image', {
      uri: Platform.OS === 'android' ? image : image.replace('file://', ''),
      name: user.name,
      type: fileType,
    });
  } */

  /* api.post('/Usuario', formData, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    }
  })
    .then(res => {
      console.warn('SUCCESS');
      // ...
    })
    .catch(error => {
      console.warn(error);
      // ...  
    }); *
    axios({
      method: "post",
      url: "http://192.168.15.11:5000/api/Usuario",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(function (response) {
      console.warn(response);
    })
    .catch(function (response) {
      //handle error
      console.warn(response);
    });
}
*/


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
          <TouchableOpacity style={styles.mainContentFormInput} onPress={() => navigation.navigate('Cameraa')}>
            <TextInput
              style={styles.mainContentFormInput}
              placeholder='Foto'
              placeholderTextColor='#000000'
              keyboardType="default"
            />
          </TouchableOpacity>
          {/*  <Button title="Take Pic" onPress={takePic} /> */}
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
          {/* <TouchableOpacity style={styles.mainContentFormButton}>
            <Text style={styles.mainContentFormButtonText} onPress={onSubmit}>Cadastrar</Text>
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