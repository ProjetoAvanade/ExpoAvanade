import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64'

export async function usuarioAutenticado() {
    return await AsyncStorage.getItem('userToken') !== null;
}

export async function parseJwt() {

    if (await AsyncStorage.getItem('userToken') != null) {

        let token = await (await AsyncStorage.getItem('userToken')).split('.')[1]
        return base64.decode(token);
    }

    return null

};