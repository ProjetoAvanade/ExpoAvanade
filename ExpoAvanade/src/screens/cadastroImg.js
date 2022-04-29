import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TextInput, TouchableOpacity } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import api from '../services/api';

function Cameraa() {
    const [idTipoUsuario] = useState(2);
    const [nomeUsuario, setNomeUsuario] = useState('algm');
    const [email, setEmail] = useState('aglm@gmail.com');
    const [senha, setSenha] = useState('algu7171');
    const [dataNascimento, setNascimento] = useState('11/11/2011');
    const [cpf, setCpf] = useState('111192928');
    const [imagem] = useState(true);
    const [arquivo, setArquivo] = useState('');
    const [result, setResult] = useState('');

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
        fetch('$/Usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: formData,
        }).then(response => {
            console.log('Usuario Cadastrado')
        }).catch(erro => {
            console.log(erro)
        })

        /*  try {
             const filename = arquivo.split('/').pop();
             const match = /\.(\w+)$/.exec(filename);
             const type = match ? `image/${match[1]}` : `image`;
             const formData = new FormData()
             formData.append('idTipoUsuario', idTipoUsuario);
             formData.append('nomeUsuario', nomeUsuario);
             formData.append('email', email);
             formData.append('senha', senha);
             formData.append('dataNascimento', dataNascimento);
             formData.append('cpf', cpf);
             /* formData.append('imagem', imagem);
             formData.append('arquivo', {
                 name: filename,
                 type: type,
                 uri: arquivo
             }); *
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
         }; */


        /* const formData = new FormData()
        formData.append('IdTipoUsuario', idTipoUsuario);
        formData.append('NomeUsuario', nomeUsuario);
        formData.append('Email', email);
        formData.append('Senha', senha);
        formData.append('DataNascimento', dataNascimento);
        formData.append('Cpf', cpf);
        formData.append('Imagem', imagem);
        /* formData.append('arquivo', {
            name: filename,
            type: type,
            uri: arquivo
        }) *
        axios({
            method: "post",
            url: "http://192.168.15.11:5000/api/Usuario",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            }); */
        /* let Data = new FormData();
        Data.append('idTipoUsuario', idTipoUsuario);
        Data.append('nomeUsuario', nomeUsuario);
        Data.append('email', email);
        Data.append('senha', senha);
        Data.append('dataNascimento', dataNascimento);
        Data.append('cpf', cpf);
        Data.append('imagem', imagem);
        Data.append('arquivo',
            {
                uri: Platform.OS === 'android' ? result.uri : result.uri.replace('file://', ''),
                type: result.type,
                name: result.uri.replace(/^.*[\\\/]/, '')
            });
        fetch("http://192.168.15.11:5000/api/Usuario", {
            body: Data,
            method: "post",
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then((response) => response.json())
            .then((json) => {
                console.log({
                    json
                });
            })
            .catch((err) => {
                console.log({
                    err
                });
                console.log(Data)
            }); */
    }



    return (
        <View style={styles.screen}>
            <View style={styles.buttonContainer}>
                <Button onPress={showImagePicker} title="Select an image" />
                <Button onPress={openCamera} title="Open camera" />
            </View>

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

            <View style={styles.imageContainer}>
                {
                    arquivo !== '' && <Image
                        source={{ uri: arquivo }}
                        style={styles.image}
                    />
                }
            </View>

            <TouchableOpacity style={styles.mainContentFormButton} onPress={Cadastrar}>
                <Text style={styles.mainContentFormButtonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Cameraa;

// Kindacode.com
// Just some styles
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        width: 400,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    imageContainer: {
        padding: 30
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover'
    },
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