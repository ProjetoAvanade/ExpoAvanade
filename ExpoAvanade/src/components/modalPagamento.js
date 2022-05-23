import React from 'react';
import {
    View,
    StyleSheet,
    Button,
    Modal,
    Image,
    Text,
    TouchableOpacity,
    Animated,
} from 'react-native';

const ModalPoup = ({ visible, children }) => {
    const [showModal, setShowModal] = React.useState(visible);
    const scaleValue = React.useRef(new Animated.Value(0)).current;
    React.useEffect(() => {
        toggleModal();
    }, [visible]);
    const toggleModal = () => {
        if (visible) {
            setShowModal(true);
            Animated.spring(scaleValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            setTimeout(() => setShowModal(false), 200);
            Animated.timing(scaleValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    };
    return (
        <Modal transparent visible={showModal}>
            <View style={styles.modalBackGround}>
                <Animated.View
                    style={[styles.modalContainer, { transform: [{ scale: scaleValue }] }]}>
                    {children}
                </Animated.View>
            </View>
        </Modal>
    );
};

const ModalPagamento = () => {
    const [visible, setVisible] = React.useState(true);
    return (
        <ModalPoup visible={visible}>
            <View style={{ alignItems: 'center' }}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => setVisible(false)}>
                        <Image
                            source={require('../../assets/icon.png')}
                            style={{ height: 30, width: 30 }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Image
                    source={require('../../assets/icon.png')}
                    style={{ height: 100, width: 150, marginVertical: 10 }}
                />
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 20, }}>
                <Text style={{ fontSize: 14, textAlign: 'center' }}>
                    O Avanade utilizará sua localização
                </Text>

                <TouchableOpacity style={styles.btn} onPress={() => setVisible(false)}>
                    <Text style={styles.btnLogoutText}>OK</Text>
                </TouchableOpacity>
            </View>
        </ModalPoup>
    );
};

const styles = StyleSheet.create({
    modalBackGround: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingVertical: 40
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        /* paddingHorizontal: 20,
        paddingVertical: 30, */
        borderRadius: 20,
        elevation: 20,
    },
    header: {
        width: '100%',
        height: 40,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    btn: {
        marginTop: '7%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: 100,
        backgroundColor: '#F3BC2C',
        borderRadius: 5,
    },
    btnLogoutText: {
        fontSize: 14,
        color: '#000',
    },
});

export default ModalPagamento;