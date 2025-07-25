// src/screens/LoginScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/stack';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Se já estiver logado, vai direto para a lista
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) navigation.replace('List');
    });
    return unsub;
  }, []);

  async function handleLogin() {
    if (!email || !password) {
      return Alert.alert('Erro', 'Email e senha são obrigatórios.');
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // onAuthStateChanged cuidará da navegação
    } catch (err) {
      Alert.alert('Falha ao entrar', (err as Error).message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FeedbackHub</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} />
      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        Ainda não tem conta? Cadastre-se
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  link: {
    marginTop: 16,
    color: '#3498db',
    textAlign: 'center',
  },
});
