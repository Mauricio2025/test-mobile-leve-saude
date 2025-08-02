// src/screens/RegisterScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { RootStackParamList } from '../navigation/stack';
import DropDownPicker from 'react-native-dropdown-picker';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [accessLevel, setAccessLevel] = useState<'user' | 'admin'>('user');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownItems, setDropdownItems] = useState([
    { label: 'Usuário', value: 'user' },
    { label: 'Administrador', value: 'admin' },
  ]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email || !password || !confirm) {
      return Toast.show({ type: 'error', text1: 'Erro', text2: 'Preencha todos os campos.' });
    }
    if (password !== confirm) {
      return Toast.show({ type: 'error', text1: 'Erro', text2: 'As senhas não conferem.' });
    }
    try {
      setLoading(true);
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', cred.user.uid), {
        uid: cred.user.uid,
        name,
        email: cred.user.email,
        accessLevel,
        createdAt: serverTimestamp(),
      });
      Toast.show({ type: 'success', text1: 'Sucesso', text2: 'Cadastro concluído!' });
      setTimeout(() => navigation.replace('Login'), 1000);
    } catch (err) {
      Toast.show({ type: 'error', text1: 'Falha ao registrar', text2: (err as Error).message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.flex}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="#FB4C00" />
        </TouchableOpacity>

        <Text style={styles.title}>Criar Conta</Text>

        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Nome completo"
            value={name}
            onChangeText={setName}
            editable={!loading}
          />
        </View>

        <View style={styles.dropdownWrapper}>
          <DropDownPicker
            open={dropdownOpen}
            setOpen={setDropdownOpen}
            value={accessLevel}
            setValue={setAccessLevel}
            items={dropdownItems}
            setItems={setDropdownItems}
            style={styles.dropdown}
            placeholder="Nível de Acesso"
            disabled={loading}
            zIndex={1000}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            editable={!loading}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed" size={20} style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry={!showConfirm}
            editable={!loading}
          />
          <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
            <Ionicons name={showConfirm ? 'eye-off-outline' : 'eye-outline'} size={20} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Registrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Já tem conta? Faça login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flexGrow: 1,
    backgroundColor: '#FCF9EC',
    justifyContent: 'center',
    padding: 24,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 24 : 48,
    left: 24,
    zIndex: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#191970',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FB4C00',
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 50,
  },
  dropdownWrapper: {
    zIndex: 1000,
    marginBottom: 16,
  },
  dropdown: {
    borderColor: '#FB4C00',
    height: 50,
  },
  icon: {
    color: '#FB4C00',
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
  },
  button: {
    backgroundColor: '#FB4C00',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#FC4C02',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    color: '#FB4C00',
    textAlign: 'center',
    fontSize: 14,
  },
});
