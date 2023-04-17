import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';

import firebase from '../services/firebaseConnection';

export default function Login({ changeStatus }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('login');

    const handleLogin = () => {
        if(type === 'login') {
            const user = firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
                changeStatus(user.user.uid);
                alert('Usuário Logado');
            })
            .catch((err) => {
                alert('Ops aconteceu algum erro!');
                return;
            });
        } 
        if(type === 'cadastrar') {
            const user = firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
                changeStatus(user.user.uid);
                alert('Usuário Cadastrado!');
            })
            .catch((err) => {
                alert('Ops aconteceu algum erro!');
                return;
            });
        }



        setEmail('');
        setPassword('');

    };



    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                placeholder='Seu Email'
                style={styles.input}
                value={email}
                onChangeText={(t) => setEmail(t)}            
            />

            <TextInput
                placeholder='*********'
                style={styles.input}
                value={password}
                onChangeText={(t) => setPassword(t)}            
            />

            <TouchableOpacity 
            style={styles.handleLogin}
            onPress={handleLogin}
            >
                <Text style={styles.loginText}>
                    { type === 'login' ? 'Acessar' : 'Cadastrar' }
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={ () => setType(type => type === 'login' ? 'cadastrar' : 'login') }
            >
                <Text style={{ textAlign: 'center' }}>
                    { type === 'login' ? 'Criar uma conta' : 'Ir para tela de Login' }
                </Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f6fc',
        marginTop: -300,
        paddingTop: 70,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    input: {
        marginBottom: 10,
        backgroundColor: '#FFF',
        height: 45,
        padding: 10,
        borderWidth: 1,
        borderColor: '#141414'
    },
    handleLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#141414',
        height: 45,
        marginBottom: 10,
    },
    loginText: {
        color: '#FFF',
        fontSize: 18,
    }
});